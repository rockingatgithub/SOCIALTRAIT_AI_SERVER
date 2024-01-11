import { Injectable } from "@nestjs/common";
import { News } from "src/model/news.model";
import puppeteer from 'puppeteer';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class ScrapingService {

    constructor(
        @InjectModel(News.name)
        private newsModel: Model<News>
    ) {}

    pageURL='https://news.ycombinator.com/'

    // ======================== function to scrape latest news items ============================

    async getNews() : Promise<News[]> {

        // =============== launching the browser in headless mode ===========================
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        await page.setViewport({width: 1080, height: 1024});
        await page.goto(this.pageURL, {  waitUntil: 'domcontentloaded' })

        await page.waitForFunction( () => document.querySelector('#hnmain')?.querySelectorAll('tbody > tr').length >= 3)

        const mainRow =  (await page.$$('#hnmain tbody > tr'))[3]
        const titleRows = await mainRow.$$('.athing')
        const subTextRows = await mainRow.$$('.subtext')
        const newsRows = { titleRows, subTextRows }
        let index = 0;

        // =========== Adding scraped news to the database =================
        for (index = 0; index < newsRows.titleRows.length; index++) {

            const titleElement = newsRows.titleRows[index];
            const subtextElement = newsRows.subTextRows[index];

            const title = await page.evaluate((element) => element.querySelector('.titleline')?.textContent , titleElement)
            const author = await page.evaluate((element) => element.querySelector('.hnuser')?.textContent || '' , subtextElement)
            const postedTime = await page.evaluate((element) => element.querySelector('.age')?.textContent || '' , subtextElement)

            if (title) {

                const newsData = new News()
                newsData.author = author
                newsData.postedTime = postedTime
                newsData.title = title

                const news = new this.newsModel(newsData)
                await news.save()
            }

        }

        return await this.newsModel.find().sort({ createdAt: -1 }).limit(30)
    }
}