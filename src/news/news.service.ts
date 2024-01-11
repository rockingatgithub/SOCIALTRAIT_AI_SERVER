import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from 'src/model/news.model';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
  
  constructor() {}

  async getNews(): Promise<News[]> {

    try {

     return [new News()]



    } catch(error) {

    }

  }
}
