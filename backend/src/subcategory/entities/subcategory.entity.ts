import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
@Schema()
export class Subcategory {

    @Prop()
    name :string
     @Prop({type:Types.ObjectId,ref:"category"})
    categoryId: Types.ObjectId
}

export const SubcategorySchema = SchemaFactory.createForClass(Subcategory)
