import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MaxLength } from "class-validator"

export class CreateProductDto {

     @ApiProperty()
            @IsString()
            @MaxLength(20)
        name:string 

           @ApiProperty()
            @IsString()
            @IsNotEmpty()
           idsubcategory : string

            @ApiProperty()
            @IsString()
           price : string

            @ApiProperty()
            @IsString()
           image : string

       @ApiProperty()
            @IsString()
          quantity: string

         @ApiProperty()
            @IsString()
           description: string      
          }
