import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { OrdersRepository } from '../repository/orders.repository';
import { FilmsRepository } from '../films/films.repository';
import { CreateOrderDto, OrderResponseDto, OrderItemDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    private readonly filmsRepository: FilmsRepository,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderResponseDto> {
    const { email, phone, tickets } = createOrderDto;

    if (!tickets || tickets.length === 0) {
      throw new BadRequestException('Tickets array cannot be empty');
    }

    // Группируем билеты по фильмам и сессиям для проверки доступности мест
    const ticketsBySession = new Map<string, { filmId: string; scheduleId: string; seats: string[] }[]>();

    for (const ticket of tickets) {
      const sessionKey = `${ticket.film}:${ticket.session}`;
      
      if (!ticketsBySession.has(sessionKey)) {
        ticketsBySession.set(sessionKey, []);
      }

      const seatKey = `${ticket.row}:${ticket.seat}`;
      ticketsBySession.get(sessionKey)!.push({
        filmId: ticket.film,
        scheduleId: ticket.session,
        seats: [seatKey],
      });
    }

    // Проверяем и бронируем места для каждой сессии
    for (const [sessionKey, sessionTickets] of ticketsBySession.entries()) {
      const [filmId, scheduleId] = sessionKey.split(':');
      
      // Проверяем существование фильма и сессии
      const schedule = await this.filmsRepository.findScheduleById(filmId, scheduleId);
      if (!schedule) {
        throw new NotFoundException(`Session ${scheduleId} for film ${filmId} not found`);
      }

      // Собираем все места для этой сессии
      const allSeats = sessionTickets.flatMap(t => t.seats);

      // Проверяем, что места не заняты
      for (const seat of allSeats) {
        if (schedule.taken.includes(seat)) {
          throw new BadRequestException(`Seat ${seat} is already taken`);
        }
      }

      // Бронируем места
      const success = await this.filmsRepository.addTakenSeats(filmId, scheduleId, allSeats);
      if (!success) {
        throw new BadRequestException(`Failed to book seats for session ${sessionKey}`);
      }
    }

    // Создаём заказ
    const orderItems: OrderItemDto[] = tickets.map(ticket => ({
      id: new Date().getTime().toString() + Math.random().toString(36).substr(2, 9),
      film: ticket.film,
      session: ticket.session,
      daytime: ticket.daytime,
      row: ticket.row,
      seat: ticket.seat,
      price: ticket.price,
    }));

    await this.ordersRepository.create({
      email,
      phone,
      tickets: orderItems,
    });

    return {
      total: orderItems.length,
      items: orderItems,
    };
  }
}
