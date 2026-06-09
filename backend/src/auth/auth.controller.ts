import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

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

}
