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
import { RateCommandService } from "./../../services/rate.command.service";
import { RateQueryService } from "./../../services/rate.query.service";
import { RatePayload } from "./../../dto/rate.dto";
import {Rate} from "../../domain/rate.entity";

@Controller("rates")
export class RateController {
    constructor(
        private commandService: RateCommandService,
        private queryService: RateQueryService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async store(
        @Query("idExperienceTransaction") idExperienceTransaction: string,
        @Body() payload: RatePayload,
    ): Promise<void> {
        const completePayload = { ...payload, idExperienceTransaction };

        await this.commandService.store(completePayload);
    }

    @Get()
    async index(): Promise<Rate[]> {
        const rates = await this.queryService.index();

        return rates;
    }

    @Get("/single")
    async show(
        @Query("id") id: string,
    ): Promise<Rate> {
        const rate = await this.queryService.show(id);

        return rate;
    }

    @Put()
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(
        @Query("id") id: string,
        @Body() payload: Partial<RatePayload>,
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
