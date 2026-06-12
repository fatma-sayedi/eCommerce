import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()

export class Category {
    @Prop()
    name : string

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Subcategory' }], default: [] })
    subcategoriesId: Types.ObjectId[]
}



export const categorySchema = SchemaFactory.createForClass(Category)