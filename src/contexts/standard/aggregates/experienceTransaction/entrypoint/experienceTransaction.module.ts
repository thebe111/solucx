import { Module } from "@nestjs/common";
import { ExperienceTransactionController } from "./rest/experienceTransaction.controller";
import { ExperienceTransactionCommandService } from "./../services/experienceTransaction.command.service";
import { ExperienceTransactionQueryService } from "./../services/experienceTransaction.query.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExperienceTransaction } from "./../domain/experienceTransaction.entity";
import { CustomerModule } from "./../../customer/entrypoint/customer.module";
import { ContributorModule } from "./../../contributor/entrypoint/contributor.module";
import { ShopModule } from "./../../shop/entrypoint/shop.module";

@Module({
    imports: [
        CustomerModule,
        ContributorModule,
        ShopModule,
        TypeOrmModule.forFeature([ExperienceTransaction]),
    ],
    controllers: [ExperienceTransactionController],
    providers: [
        ExperienceTransactionCommandService,
        ExperienceTransactionQueryService,
    ],
    exports: [ExperienceTransactionQueryService],
})
export class ExperienceTransactionModule {}
