import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';

const mockOrderResponse = {
  total: 2,
  items: [
    { id: 'item-1', film: 'film-1', session: 'session-1', daytime: '2025-01-01T10:00:00.000Z', row: 1, seat: 5, price: 500 },
    { id: 'item-2', film: 'film-1', session: 'session-1', daytime: '2025-01-01T10:00:00.000Z', row: 1, seat: 6, price: 500 },
  ],
};

const createOrderDto: CreateOrderDto = {
  email: 'test@example.com',
  phone: '+79001234567',
  tickets: [
    { film: 'film-1', session: 'session-1', daytime: '2025-01-01T10:00:00.000Z', row: 1, seat: 5, price: 500 },
    { film: 'film-1', session: 'session-1', daytime: '2025-01-01T10:00:00.000Z', row: 1, seat: 6, price: 500 },
  ],
};

describe('OrderController', () => {
  let controller: OrderController;
  let orderService: jest.Mocked<OrderService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<OrderController>(OrderController);
    orderService = module.get(OrderService);
  });

  describe('createOrder', () => {
    it('should pass dto to service and return order response', async () => {
      orderService.createOrder.mockResolvedValue(mockOrderResponse);

      const result = await controller.createOrder(createOrderDto);

      expect(orderService.createOrder).toHaveBeenCalledWith(createOrderDto);
      expect(result).toEqual(mockOrderResponse);
    });
  });
});
