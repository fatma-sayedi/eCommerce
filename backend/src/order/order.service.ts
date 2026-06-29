import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InterfaceCart } from 'src/cart/interface/cart.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderLine } from './entities/orderLine.entity';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {

    constructor (@InjectModel("cart") private cartentity:Model<InterfaceCart> ,
    @InjectModel("order") private orderEntity:Model<Order> ,
     @InjectModel("orderLine") private orderLineEntity:Model<OrderLine> 
  ){}
 async createOrderFromCart(userId:string) {
   
    const userCart = await this.cartentity.findOne({user:userId}).populate('items.product')
    if(!userCart){
      throw new  NotFoundException("category not found")
    }
   let amount =  0
   const order = new this.orderEntity({user:userId, totalAmount : 0})
   await order.save()
   const cartItems = userCart.items as Array<{ product: any; quantity: number }>;
   //calcul d prix de la ligne de commande
   for(const item of cartItems){
   const product = item.product as any;
   const totalPrix = Number(product.price) * item.quantity
   amount += totalPrix
   const orderLine = new this.orderLineEntity({order:order._id, product: product._id ?? product})
   await orderLine.save()
   }
   order.totalAmount= amount
   await order.save()
   userCart.items= []
   await userCart.save()
   return { message:"commande cree" }
  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
