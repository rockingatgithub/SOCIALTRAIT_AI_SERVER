import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { ScrapingModule } from 'src/scraping/scraping.module';
import { MongooseModule } from '@nestjs/mongoose';

// ==================== NestJS App module for loading all other modules ================================
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/hackerNews'),
    ScheduleModule.forRoot(),
    ScrapingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
