import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { cartSchema } from './entities/cart.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:'cart',schema:cartSchema}])],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {

}
