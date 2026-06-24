import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ApiBearerAuth } from '@nestjs/swagger/dist/decorators/api-bearer.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard('jwt'))
  @Post("/addProducttoCart")
  create( @Req() req , @Body() createCartDto: CreateCartDto) {
    return this.cartService.addToCart(createCartDto, req.user.userId);
  }

    @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard('jwt'))
  @Get("/getCart")
  getCart(@Req() req) {
return this.cartService.getCartByUserId(req.user.userId)
  }


   @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard('jwt'))
  @Delete("/deleteProductFromCart/:productId")
  deleteCart(@Req() req,@Param('productId') productId:string) {
return this.cartService.remove(req.user.userId,productId)
  }

}
