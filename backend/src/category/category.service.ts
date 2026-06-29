import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Icategory } from './interface/category.interface';

@Injectable()
export class CategoryService {
  constructor (@InjectModel("category") private categoryentity:Model<Icategory>){}
  async create(createCategoryDto: CreateCategoryDto) {
    const newCategory = new this.categoryentity(createCategoryDto)
    return await newCategory.save();
  }

  async findAll( ) {
    return await this.categoryentity
      .find()
      .populate({ path: 'subcategoriesId', select: 'name' })
      .lean();
  }

  async findOne(id: string) {
    const categoryByid=await this.categoryentity.findById(id)
    if(!categoryByid){
      throw new  NotFoundException("category not found")
    }
    return categoryByid
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const categoryUpdated = await this.categoryentity.findByIdAndUpdate(id, updateCategoryDto,{new:true})
     if(!categoryUpdated){
      throw new  NotFoundException("category not found")
    }
    return categoryUpdated;
  }

  async remove(id: string) {

    const categoryDeleted =  await this.categoryentity.findByIdAndDelete(id)

     if(!categoryDeleted){
      throw new  NotFoundException("category not found")
    }
    return  'category deleted';
  }

  
}
