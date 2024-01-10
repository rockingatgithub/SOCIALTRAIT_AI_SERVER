import { Module } from "@nestjs/common";
import { ScrapingContoller } from "./scraping.controller";
import { ScrapingService } from "./scraping.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { News } from "src/model/news.model";

@Module({
    imports: [TypeOrmModule.forFeature([News])],
    controllers: [ScrapingContoller],
    providers: [ScrapingService]
})
export class ScrapingModule {}