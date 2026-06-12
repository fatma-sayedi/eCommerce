import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Isubcategory } from './interface/subcategory.interface';
import { Icategory } from 'src/category/interface/category.interface';


@Injectable()
export class SubcategoryService {
  constructor(@InjectModel("Subcategory") private SubCategoryentity : Model<Isubcategory>,
  @InjectModel("category")private categoryentity: Model<Icategory>
){}

 async create(createSubcategoryDto: CreateSubcategoryDto) {
  const newSubcategory = new this.SubCategoryentity(createSubcategoryDto)
  await newSubcategory.save()
  //push de l'id de subCatégory in collection category
  await this.categoryentity.findByIdAndUpdate(createSubcategoryDto.categoryId, { $push: { subcategoriesId: newSubcategory._id } } )
    return newSubcategory;
  }

  async findAll( ) {

    return (await this.SubCategoryentity.find().populate("categoryId", "name"));
  }

  async findOne(id:string) {
    const subcategorybyid = await this.SubCategoryentity.findById(id)
    if (!subcategorybyid)
    {
      throw new BadRequestException("subcategory NOT found")

    }
    return subcategorybyid ;
  }

  async update(id: string, updateSubcategoryDto: UpdateSubcategoryDto) {

      const subcategorybyid = await this.SubCategoryentity.findByIdAndUpdate(id,updateSubcategoryDto ,{new:true})
       if (!subcategorybyid)
    {
      throw new BadRequestException("subcategory NOT found")

    }

    return subcategorybyid ;
  }

  async remove(id: string) {
    const subcategorybyid = await this.SubCategoryentity.findByIdAndDelete(id)

     if (!subcategorybyid)
    {
      throw new BadRequestException("subcategory NOT found")

    }
    return subcategorybyid ;
  }
}
