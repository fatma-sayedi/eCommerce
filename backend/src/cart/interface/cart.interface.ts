import { Types } from "mongoose"



export interface InterfaceCartItem{
    product: string | Types.ObjectId
    quantity : number

}
export interface InterfaceCart{
    items: InterfaceCartItem[]
    user : Types.ObjectId
}
