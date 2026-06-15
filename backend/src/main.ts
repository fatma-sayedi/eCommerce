import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import * as express from 'express';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //autoriser le backend pour communiquer avec le frontend
  app.enableCors({ origin: '*', Credentials: true });
  //Rendre l'image accessible via une URL
  app.use(
    '/uploads',
    express.static(join(process.cwd(), 'uploads')),
  );
  const config = new DocumentBuilder()
    .setTitle('application ecommerce')
    .setDescription('application ecommerce')
    .setVersion('1.0')
    //configure Swagger pour utiliser JWT dans l'interface utilisateur
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
      'accessToken', // should be exactly coressponding
    )
    .addTag('ecommerce')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
