import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post("/addproduct")
  //configuration swagger for multer
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
         Subcategoryid: {
          type: 'string',
        },
        price: {
          type: 'string',
        },
        quantity: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  create(@Body() createProductDto: CreateProductDto,@UploadedFile() file: Express.Multer.File,) {
    return this.productService.create({...createProductDto,image:file?.filename});
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }


  @Patch(':id')
    @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        Subcategoryid: {
          type: 'string',
        },
        price: {
          type: 'string',
        },
        quantity: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads/images',
        filename: (req, file, cb) => {
          const uniqueName = `${Date.now()}${extname(file.originalname)}`;
          cb(null, uniqueName);
        },
      }),
    }),
  )
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto,@UploadedFile() file: Express.Multer.File,) {
    return this.productService.update(id,{...updateProductDto,image:file?.filename} );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
