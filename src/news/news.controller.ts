import { Controller, Get } from "@nestjs/common";
import { NewsService } from "./news.service";
import { News } from "src/model/news.model";

@Controller()
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get()
    async getNews() : Promise<News[]> {
        try {
            return this.newsService.getNews()
        } catch(error) {
            console.log("Error while fetching news!")
        }
    }
}