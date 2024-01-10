import { Controller, Get } from "@nestjs/common";
import { ScrapingService } from "./scraping.service";
import { Cron, CronExpression } from "@nestjs/schedule";
import { News } from "src/model/news.model";


@Controller('scrap')
export class ScrapingContoller {
    constructor(private readonly scrapingService: ScrapingService) {}
    
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    @Get()
    async getHello(): Promise<News[]> {

        try {
            return await this.scrapingService.getNews()
        } catch(error) {
            console.log("error occured", error)
        }

    }
}