import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2';
import { console } from 'inspector';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'mail/mail.service';

@Injectable()
export class AuthService {
  constructor(private userService : UserService,
    private jwtservice: JwtService,
    private configService: ConfigService,
    private emailService : EmailService

  ){}
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

  async generateTokens(userId:string, email:string){
    const[accessToken, refreshToken ] = await Promise.all([
      this.jwtservice.signAsync(
        {sub:userId, email},
        {secret:this.configService.get<string>("ACCESSKEY"),expiresIn:"3d"}
      ),

       this.jwtservice.signAsync(
        {sub:userId, email},
        {secret:this.configService.get<string>("REFRESHKEY"),expiresIn:"10w"}
      )
    ]) 
    return {accessToken, refreshToken}
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
  const tokens = await this.generateTokens(existingUser._id.toString(),existingUser.email)
  
  return {existingUser, tokens}


  }
  async forgotPassword (email:string){
     const existingUser = await this.userService.findByemail(email)

  //verifier si user avec cet email exist ou non
  if(!existingUser){
    throw new NotFoundException("user with this email doesn't exist")

  }
  const subject ="reset Password" 
  const token = Math.random().toString(36).substring(2) // generate a random token
  existingUser.resetPasswordToken = token
  existingUser.resetPasswordExpires = Date.now() + 3600000// token expires in 1 hour
  await existingUser.save()
  const link = `http://localhost:3000/reset/${token}`
  const htmlMessage =`<h2 >hello ${existingUser.name}
  <p>please use this link to reset your password</p>
  <a href='${link}'>${link}</a> `
  const emailSend = await this.emailService.sendResetEmail(existingUser.email, subject, htmlMessage)
  if(emailSend){
    return ("reset email send successfully") }
    else
    {return("failure reset send email")}


  }
 
  async resetPassword(newPassword:string, token:string){
    const user = await this.userService.findByresetToken(token)
    if(!user){
      throw new NotFoundException("invalid or expired token")
    }
    const hachedPassword = await argon2.hash(newPassword)
    user.password = hachedPassword
    user.resetPasswordToken = ""
    user.resetPasswordExpires = 0
    await user.save()
    return "password reset successfully"
 }


  async logout(userId:string){
    await this.userService.update(userId,{refreshToken:null})
    return ("logged out successfully")
}
}
