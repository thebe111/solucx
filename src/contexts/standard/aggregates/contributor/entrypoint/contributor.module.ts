import { Module } from "@nestjs/common";
import { ContributorController } from "./rest/contributor.controller";
import { ContributorCommandService } from "./../services/contributor.command.service";
import { ContributorQueryService } from "./../services/contributor.query.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Contributor } from "./../domain/contributor.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Contributor])],
    controllers: [ContributorController],
    providers: [ContributorCommandService, ContributorQueryService],
    exports: [ContributorQueryService],
})
export class ContributorModule {}
