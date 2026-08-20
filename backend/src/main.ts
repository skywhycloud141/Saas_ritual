import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(join(process.cwd(), 'uploads'), { prefix: '/uploads/' });
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    transform:true
  }))

  const config = new DocumentBuilder().setTitle("3D Ritual Saas API").setDescription("API для конструктора мест захоронения и управления агенством ").setVersion("1.0").addBearerAuth().build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup("api",app,document)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
