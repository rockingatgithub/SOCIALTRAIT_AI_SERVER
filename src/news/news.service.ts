import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/model/news.model';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  
  constructor(@InjectRepository(News)
  private newsRepository: Repository<News>) {}

  async getNews(): Promise<News[]> {

    try {

      const news = await this.newsRepository.find({})
      return news;



    } catch(error) {

    }

  }
}
