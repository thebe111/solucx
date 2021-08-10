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
import { ContributorCommandService } from "./../../services/contributor.command.service";
import { ContributorQueryService } from "./../../services/contributor.query.service";
import { ContributorPayload } from "./../../dto/contributor.dto";
import { Contributor } from "../../domain/contributor.entity";

@Controller("contributors")
export class ContributorController {
    constructor(
        private commandService: ContributorCommandService,
        private queryService: ContributorQueryService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async store(
        @Body() payload: ContributorPayload,
    ): Promise<void> {
        await this.commandService.store(payload);
    }

    @Get()
    async index(): Promise<Contributor[]> {
        const payload = await this.queryService.index();

        return payload;
    }

    @Get("/single")
    async show(
        @Query("id") id: string,
    ): Promise<Contributor> {
        const payload = await this.queryService.show(id);

        return payload;
    }

    @Put()
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(
        @Query("id") id: string,
        @Body() payload: ContributorPayload,
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
