import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Включаем CORS
  app.enableCors();
  
  // Настраиваем глобальную валидацию
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  // Настраиваем Swagger
  const config = new DocumentBuilder()
    .setTitle('Симуляция магазина API')
    .setDescription('API для симуляции работы магазина')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Запускаем приложение
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Приложение запущено на порту: ${process.env.PORT ?? 3000}`);
}
bootstrap();
