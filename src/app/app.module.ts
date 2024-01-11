import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { NewsModule } from 'src/news/news.module';
import { ScrapingModule } from 'src/scraping/scraping.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/hackerNews'),
    ScheduleModule.forRoot(),
    NewsModule,
    ScrapingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
