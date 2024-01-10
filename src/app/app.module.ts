import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ScheduleModule } from '@nestjs/schedule';
import { NewsModule } from 'src/news/news.module';
import { ScrapingModule } from 'src/scraping/scraping.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      database: 'hackerNews',
    }),
    ScheduleModule.forRoot(),
    NewsModule,
    ScrapingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
