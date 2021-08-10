import {
    Controller,
    Res,
    Get,
    Post,
    Put,
    Delete,
    Body,
    Query,
    HttpStatus,
    HttpCode,
} from "@nestjs/common";
import { ShopCommandService } from "./../../services/shop.command.service";
import { ShopQueryService } from "./../../services/shop.query.service";
import { ShopPayload } from "./../../dto/shop.dto";
import {Shop} from "../../domain/shop.entity";

@Controller("shops")
export class ShopController {
    constructor(
        private commandService: ShopCommandService,
        private queryService: ShopQueryService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async store(
        @Body() payload: ShopPayload,
    ): Promise<void> {
        await this.commandService.store(payload);
    }

    @Get()
    async index(): Promise<Shop[]> {
        const shops = await this.queryService.index();

        return shops;
    }

    @Get("/single")
    async show(
        @Query("id") id: string,
    ): Promise<Shop> {
        const shop = await this.queryService.show(id);

        return shop;
    }

    @Put()
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(
        @Query("id") id: string,
        @Body() payload: ShopPayload,
    ): Promise<void> {
        await this.commandService.update(id, payload);
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    async destroy(
        @Query("id") id: string,
    ): Promise<void> {
        await this.commandService.destroy(id);
    }
}
