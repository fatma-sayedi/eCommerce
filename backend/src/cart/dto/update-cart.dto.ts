import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCartDto } from './create-cart.dto';
import { IsNumber, isNumber } from 'class-validator';

export class UpdateCartDto  {
    @ApiProperty()
    @IsNumber()
    quantity: number

}
