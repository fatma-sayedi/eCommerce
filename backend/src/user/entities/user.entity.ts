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

        @Prop()
        resetPasswordToken : string
        @Prop()
        resetPasswordExpires : number
        @Prop({type : String,enum : ['admin','client','provider'],default : 'client'})
        role : string
    
}
export const userSchema = SchemaFactory.createForClass(User)
