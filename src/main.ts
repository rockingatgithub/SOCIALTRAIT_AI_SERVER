import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

// ================== NestJS bootstrap function ====================
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(8000);
}
bootstrap();
