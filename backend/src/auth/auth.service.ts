import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { console } from 'inspector';

@Injectable()
export class AuthService {
  constructor(private userService : UserService){}
  async register(createuserDto: CreateUserDto) {
  const existingUser = await this.userService.findByemail(createuserDto.email)

  //verifier si user avec cet email exist ou non
  if(existingUser){
    throw new NotFoundException("user with this email already exist")

  }
  //hachage de password
  const hachedPassword = await argon2.hash(createuserDto.password)
  const newUser =  await this.userService.create({...createuserDto,password:hachedPassword})
  return newUser
  }

  async login(createAuthDto: CreateAuthDto) {
  const existingUser = await this.userService.findByemail(createAuthDto.email)

  //verifier si user avec cet email exist ou non
  if(!existingUser){
    throw new NotFoundException("user with this email doesn't exist")

  }
  //decryptage e verification de password
  const matchedpassword = await argon2.verify(existingUser.password, createAuthDto.password)
  if(!matchedpassword){
    throw new NotFoundException("password doesn't match")
  }
  
  return existingUser
  }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
