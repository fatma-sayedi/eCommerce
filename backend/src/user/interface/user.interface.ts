export interface Iuser extends Document {



    name: string

    email: string
    address: string
    PhoneNumber: string
    password: string
    resetPasswordToken: string
    resetPasswordExpires: number

}