import { Module } from "@nestjs/common";
import { ShopController } from "./rest/shop.controller";
import { ShopCommandService } from "./../services/shop.command.service";
import { ShopQueryService } from "./../services/shop.query.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Shop } from "./../domain/shop.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Shop])],
    controllers: [ShopController],
    providers: [ShopCommandService, ShopQueryService],
    exports: [ShopQueryService],
})
export class ShopModule {}
