import { Injectable } from '@nestjs/common';

export interface OrderItem {
  id: string;
  film: string;
  session: string;
  daytime: string;
  row: number;
  seat: number;
  price: number;
}

export interface Order {
  id: string;
  email: string;
  phone: string;
  tickets: OrderItem[];
  createdAt: Date;
}

@Injectable()
export class OrdersRepository {
  private orders: Order[] = [];

  async create(order: Omit<Order, 'id' | 'createdAt'>): Promise<Order> {
    const newOrder: Order = {
      ...order,
      id: crypto.randomUUID(),
      createdAt: new Date(),
    };
    this.orders.push(newOrder);
    return newOrder;
  }

  async findAll(): Promise<Order[]> {
    return this.orders;
  }

  async findById(id: string): Promise<Order | null> {
    return this.orders.find((o) => o.id === id) || null;
  }
}
