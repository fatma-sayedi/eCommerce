import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [//connect to database
    MongooseModule.forRoot("mongodb://localhost:27017/Ecommerce"),
    CategoryModule,
    SubcategoryModule,
    ProductModule,
    UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
