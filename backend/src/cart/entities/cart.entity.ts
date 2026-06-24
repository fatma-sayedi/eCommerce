import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class CartItem {
    @Prop({  type: Types.ObjectId, ref: 'product' })
    product: Types.ObjectId
    @Prop({ default: 1 })
    quantity: number
}
const cartItemSchema = SchemaFactory.createForClass(CartItem)
@Schema()
export class Cart {
    @Prop({ type: [cartItemSchema], default: [] })
    items: CartItem[]
    @Prop({type: Types.ObjectId, ref: 'user' } )
    user: Types.ObjectId

}
export const cartSchema = SchemaFactory.createForClass(Cart)