import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class OrderLine {
    @Prop({type: Types.ObjectId,ref:"order"})
        order:Types.ObjectId 

        @Prop({type: Types.ObjectId,ref:"product"})
    product:Types.ObjectId 



}

export const OrderLineSchema= SchemaFactory.createForClass(OrderLine)