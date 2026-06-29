import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"

@Schema()
export class Order {
    @Prop()

    totalAmount : number
    
    @Prop({type: Types.ObjectId,ref:"user"})
    user:Types.ObjectId 
}

export const OrderSchema= SchemaFactory.createForClass(Order)
