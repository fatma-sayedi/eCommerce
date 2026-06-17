import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';
import { diskStorage } from 'multer';
import { Subcategory } from 'src/subcategory/entities/subcategory.entity';
import { AuthGuard } from '@nestjs/passport/dist/auth.guard';

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
         idsubcategory: {
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
    @ApiBearerAuth('accessToken')
    @UseGuards(AuthGuard('jwt'))
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

  @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
    @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
        },
        idsubcategory: {
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

    @ApiBearerAuth('accessToken')
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
  @Get('subcategory/:subcategoryId')
  findBySubCategoryId(@Param('subcategoryId') subcategoryId: string) {
    return this.productService.findBySubCategoryId(subcategoryId);
  } 
}

