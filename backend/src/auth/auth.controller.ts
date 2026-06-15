import { Controller,  Post, Body, Patch, Param, Delete, Req, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  
  @Post('/login')
  Login(@Body() createAuthDto: CreateAuthDto){
    return this.authService.login(createAuthDto);
  }
  @Post('/forgotPassword')
  forgotPassword(@Body() createAuthDto : CreateAuthDto){
    return this.authService.forgotPassword(createAuthDto.email);
  }
  //verify if the user is authenticated or not before allowing him to logout
  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard('jwt'))
  @Get('/logout')
  logout(@Req() req){
    const userId = req.user.userId;
    return this.authService.logout(userId);
 }
}
