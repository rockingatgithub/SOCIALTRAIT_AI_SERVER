import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { ScrapingService } from "./scraping.service";
import { Cron, CronExpression } from "@nestjs/schedule";
import { News } from "src/model/news.model";
import { Response } from "express";


@Controller('scrap')
export class ScrapingContoller {
    constructor(private readonly scrapingService: ScrapingService) { }

    // =========================== Adding job to scrap latest news every day at midnight ====================
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    @Get()
    async getLatestNews(): Promise<News[] | {}> {

        const newsData = await this.scrapingService.getNews()
        console.log("the data\n\n", newsData)
        return newsData

    }
}