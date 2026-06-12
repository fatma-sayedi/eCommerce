import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Iproduct } from './interface/product.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
   constructor (@InjectModel("product") private productentity:Model<Iproduct>){}
  
  
  async create(createProductDto: CreateProductDto) {
     const newProduct= new this.productentity(createProductDto)
    return await newProduct.save();
  }

  async findAll() {
    return await this.productentity.find().populate("idsubcategory", "name");
  }

  async findOne(id: string) {
     const productbyid = await this.productentity.findById(id).populate("idsubcategory", "name")
        if (!productbyid)
        {
          throw new BadRequestException("product NOT found")
    
        }
    return  productbyid
  }

 async update(id: string, updateProductDto: UpdateProductDto) {

    const productbyid = await this.productentity.findByIdAndUpdate(id,updateProductDto ,{new:true})
       if (!productbyid)
    {
      throw new BadRequestException("product NOT found")

    }
    return  productbyid
  }

  async remove(id: string) {
   const productbyid = await this.productentity.findByIdAndDelete(id)

     if (!productbyid)
    {
      throw new BadRequestException("PROduct NOT found")

    }
    return productbyid
  }
  async findBySubCategoryId(subcategoryId: string) {
    return await this.productentity.find({ idsubcategory: subcategoryId }).populate("idsubcategory", "name");
  } 
  
}
