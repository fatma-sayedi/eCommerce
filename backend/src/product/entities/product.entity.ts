import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Types } from "mongoose"

@Schema()
export class Product {

    @Prop({required:true})
    name :string

    @Prop({type: Types.ObjectId,ref:"Subcategory"})
    idsubcategory : Types.ObjectId 

    @Prop({required:true})
    price:string

    
    @Prop({required:true})
    image : string

    @Prop()
    quantity : string

     @Prop()
    description : string



}
export const productSchema = SchemaFactory.createForClass(Product)
