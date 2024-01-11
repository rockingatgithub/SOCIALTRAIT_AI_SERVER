import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { News } from "src/model/news.model";
import { Repository } from "typeorm";
import puppeteer from 'puppeteer';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";


@Injectable()
export class ScrapingService {

    constructor(
        @InjectModel(News.name)
        private newsModel: Model<News>
    ) {}

    async getNews() : Promise<News[]> {

        const browser = await puppeteer.launch({ headless: false });
        const page = await browser.newPage();

        await page.setViewport({width: 1080, height: 1024});
        await page.goto('https://news.ycombinator.com/', {  waitUntil: 'domcontentloaded' })

        await page.waitForFunction( () => document.querySelector('#hnmain')?.querySelectorAll('tbody > tr').length >= 3)

        console.log("\n\n table found")

        const mainRow =  (await page.$$('#hnmain tbody > tr'))[3]
        const titleRows = await mainRow.$$('.athing')
        const subTextRows = await mainRow.$$('.subtext')
        const newsRows = { titleRows, subTextRows }

        for (let index = 0; index < newsRows.titleRows.length; index++) {

            const titleElement = newsRows.titleRows[index];
            const subtextElement = newsRows.subTextRows[index];

            const title = await page.evaluate((element) => element.querySelector('.titleline')?.textContent , titleElement)
            const author = await page.evaluate((element) => element.querySelector('.hnuser')?.textContent || '' , subtextElement)
            const postedTime = await page.evaluate((element) => element.querySelector('.age')?.textContent || '' , subtextElement)

            console.log("the row data\n\n", title, author, postedTime)

            if (title) {

                const newsData = new News()
                newsData.author = author
                newsData.postedTime = postedTime
                newsData.title = title

                const news = new this.newsModel(newsData)
                await news.save()
                console.log("the row\n\n", news)

            }

        }

        return await this.newsModel.find().limit(30)
    }
}