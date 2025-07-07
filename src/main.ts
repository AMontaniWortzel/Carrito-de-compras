import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('PI BACKEND')
    .setVersion('1.0.0')
    .setDescription('Documentacion de mi PI de Henry')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig); 

  SwaggerModule.setup("api", app, document) 

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // no te deja entrar datos si no esta en el dto
      forbidNonWhitelisted: true, // devuelve error si ingresaste campo que no era
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
