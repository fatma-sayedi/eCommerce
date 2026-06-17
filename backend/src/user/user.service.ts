import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Iuser } from './interface/user.interface';

@Injectable()
export class UserService {
  
     constructor (@InjectModel("user") private userentity:Model<Iuser>){}
  
  async create(createUserDto: CreateUserDto) {
    const newUser= new this.userentity(createUserDto)
    return await newUser.save();
  }

  async findByemail(email:string){
    return await this.userentity.findOne({email})
  }

  async findAll() {
     return await this.userentity.find()
  }

  async findOne(id: string) {
    const userbyid = await this.userentity.findById(id)
            if (!userbyid)
            {
              throw new BadRequestException("product NOT found")
        
            }
        return  userbyid
  }

  async update(id: string , updateUserDto: UpdateUserDto) {
     const userbyid = await this.userentity.findByIdAndUpdate(id,updateUserDto ,{new:true})
       if (!userbyid)
    {
      throw new BadRequestException("user NOT found")

    }
    return  userbyid
  }

  async findByresetToken(token:string){
    return await this.userentity.findOne
    ({resetPasswordToken:token, resetPasswordExpires:{$gt:Date.now()}})
  }

  async remove(id: string) {
    const userbyid = await this.userentity.findByIdAndDelete(id)

     if (!userbyid)
    {
      throw new BadRequestException("user NOT found")

    }
    return userbyid
  }
}
