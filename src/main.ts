import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Disable CORS for all origins
  app.enableCors({
    origin: 'http://localhost:8082',
    credentials: true,
  });
  const config = new DocumentBuilder()
    .setTitle('User service API')
    .setDescription('API для авторизации и просмотра пользователей')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, documentFactory);
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
