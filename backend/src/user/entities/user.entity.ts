import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class User {

    @Prop({required:true})
        name :string
    
    
    
        @Prop()
        email:string
        @Prop()
        address : string
    
        @Prop()
        PhoneNumber : string
    
         @Prop()
        password : string
    
}
export const userSchema = SchemaFactory.createForClass(User)
