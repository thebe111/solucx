import { Module } from "@nestjs/common";
import { RateController } from "./rest/rate.controller";
import { RateCommandService } from "./../services/rate.command.service";
import { RateQueryService } from "./../services/rate.query.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Rate } from "./../domain/rate.entity";
import { ExperienceTransactionModule } from "./../../experienceTransaction/entrypoint/experienceTransaction.module";

@Module({
    imports: [ExperienceTransactionModule, TypeOrmModule.forFeature([Rate])],
    controllers: [RateController],
    providers: [RateCommandService, RateQueryService],
})
export class RateModule {}
