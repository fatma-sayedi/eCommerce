import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { MongooseModule} from '@nestjs/mongoose';
import { SubcategorySchema } from './entities/subcategory.entity';
import { categorySchema } from 'src/category/entities/category.entity';

@Module({
  imports: [MongooseModule.forFeature([{name:"Subcategory",schema:SubcategorySchema}]),
MongooseModule.forFeature([{name:"category",schema:categorySchema}])],
  controllers: [SubcategoryController],
  providers: [SubcategoryService],

})
export class SubcategoryModule {}
