import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { InterfaceCart } from './interface/cart.interface';

@Injectable()

export class CartService {
  constructor (@InjectModel("cart")private cartEntity:Model<InterfaceCart>){

  }
  async addToCart(createCartDto: CreateCartDto, userId: string) {
    //verifier si utlisateyr a une carte 
    let Cart = await this.cartEntity.findOne({ user: userId })
    if (!Cart) {
      Cart = new this.cartEntity({
        items: [],
        user: userId,
      })
    }

    if (!Cart.items) {
      Cart.items = []
    }

    // parcourir la liste de produits dans la carte et vérifier si le produit existe
    const itemIndex = Cart.items.findIndex((i) => i.product.toString() === createCartDto.product)
    if (itemIndex > -1) {
      Cart.items[itemIndex].quantity += createCartDto.quantity
    } else {
      Cart.items.push({ product: createCartDto.product, quantity: createCartDto.quantity })
    }

    return await Cart.save()
  }

async getCartByUserId(userId: string) {
    const cart = await this.cartEntity.findOne({ user: userId }).populate('items.product')
    if(!cart){
      throw new NotFoundException("cart not found")
    }
    return cart
  }


  async remove(userId: string,productId:string) {

    const cart=  await this.cartEntity.findOne({user:userId})

     if(!cart){
      throw new  NotFoundException("cart not found")
    }
    cart.items=cart.items.filter((i)=>i.product.toString() !== productId)
    await cart.save()
    return  'product deleted from cart';
  }

  async update(userId: string,productId:string,quantity:number){
     const cart=  await this.cartEntity.findOne({user:userId})
      if(!cart){
      throw new  NotFoundException("cart not found")
    }
    const cartItem=cart.items.find((i)=>i.product.toString() === productId)
    if(!cartItem){
      throw new  NotFoundException("product not found in the cart")
    }
    cartItem.quantity= quantity
    return cart.save()

    
  }


}
