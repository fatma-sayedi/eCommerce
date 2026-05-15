import { ApiProperty } from "@nestjs/swagger";
import { IsString, MaxLength } from "class-validator";

export class CreateSubcategoryDto {

      @ApiProperty()
        @IsString()
        @MaxLength(20)
    
       name:string 
       @ApiProperty()
    
        @IsString()
       categoryId: string
}
