import { Module } from "@nestjs/common";
import { ScrapingContoller } from "./scraping.controller";
import { ScrapingService } from "./scraping.service";
import { News, NewsSchema } from "src/model/news.model";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [MongooseModule.forFeature([ { name: News.name, schema: NewsSchema  } ])],
    controllers: [ScrapingContoller],
    providers: [ScrapingService]
})
export class ScrapingModule {}