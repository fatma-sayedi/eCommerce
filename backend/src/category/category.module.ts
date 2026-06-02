import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { categorySchema } from './entities/category.entity';
import { SubcategorySchema } from 'src/subcategory/entities/subcategory.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:"category", schema:categorySchema}]),
MongooseModule.forFeature([{name:"Subcategory",schema:SubcategorySchema}])],
  controllers: [CategoryController],
  providers: [CategoryService],

})
export class CategoryModule {}
