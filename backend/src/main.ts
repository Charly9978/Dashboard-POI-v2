import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: true, credentials: true });
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('DashBoard POI')
    .setDescription('api du dashboard POI')
    .setVersion('1.0')
    .addTag('DashBoard POI')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swag', app, document);
  await app.listen(3000);
}
bootstrap();
