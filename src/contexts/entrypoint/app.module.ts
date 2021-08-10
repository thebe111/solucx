import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { CustomerModule } from "./../standard/aggregates/customer/entrypoint/customer.module";
import { RateModule } from "./../standard/aggregates/rate/entrypoint/rate.module";
import { ShopModule } from "./../standard/aggregates/shop/entrypoint/shop.module";
import { ContributorModule } from "./../standard/aggregates/contributor/entrypoint/contributor.module";
import { ExperienceTransactionModule } from "./../standard/aggregates/experienceTransaction/entrypoint/experienceTransaction.module";
import { APP_INTERCEPTOR, APP_FILTER, APP_PIPE } from "@nestjs/core";
import { HideNonMappedException } from "./../../core/exceptions";
import { ValidateRequest } from "./../../core/validations";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ServerResponse } from "./../../core/response";

@Module({
    imports: [
        RateModule,
        ShopModule,
        ContributorModule,
        CustomerModule,
        ExperienceTransactionModule,
        TypeOrmModule.forRoot(),
    ],
    controllers: [],
    providers: [
        { provide: APP_FILTER, useClass: HideNonMappedException },
        { provide: APP_PIPE, useClass: ValidateRequest },
        { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
        { provide: APP_INTERCEPTOR, useClass: ServerResponse }
    ],
})
export class AppModule {}
