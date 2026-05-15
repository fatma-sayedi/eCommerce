import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty()
    @IsString()
    @MaxLength(20)

   name:string
    @ApiProperty()
    @IsString()
    subcategoriesId:string[]
   

}
