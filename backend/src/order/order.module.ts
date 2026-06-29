import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseError } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './entities/order.entity';
import { OrderLineSchema } from './entities/orderLine.entity';
import { cartSchema } from 'src/cart/entities/cart.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"order",schema:OrderSchema},{name:"orderLine",schema:OrderLineSchema}, {name:"cart",schema:cartSchema}])],
  controllers: [OrderController],
  providers: [OrderService],

})
export class OrderModule {}
