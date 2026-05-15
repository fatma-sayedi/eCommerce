import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { productSchema } from './entities/product.entity';

@Module({
  imports: [MongooseModule.forFeature([{name : "product",schema:productSchema}])],
  controllers: [ProductController],
  providers: [ProductService],
  
})
export class ProductModule {}
