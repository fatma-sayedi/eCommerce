import { ApiProperty } from "@nestjs/swagger"
import { IsString, MaxLength } from "class-validator"

export class CreateUserDto {

    @ApiProperty()
    @IsString()
    @MaxLength(10)
    name: string
    @ApiProperty()
    @IsString()
    email: string
    @ApiProperty()
    @IsString()
    address: string
    @ApiProperty()
    @IsString()
    PhoneNumber: string
    @ApiProperty()
    @IsString()
    password: string

}
