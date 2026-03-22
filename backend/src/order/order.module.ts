import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrdersRepository } from '../repository/orders.repository';

@Module({
  controllers: [OrderController],
  providers: [OrderService, OrdersRepository],
})
export class OrderModule {}
