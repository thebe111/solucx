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
import { ExperienceTransactionCommandService } from "./../../services/experienceTransaction.command.service";
import { ExperienceTransactionQueryService } from "./../../services/experienceTransaction.query.service";
import { ExperienceTransactionPayload } from "./../../dto/experienceTransaction.dto";
import { CompletePayloadType } from "./../../types/completePayload";
import { ReferencesType } from "./../../types/references";
import {ExperienceTransaction} from "../../domain/experienceTransaction.entity";

@Controller("experience-transactions")
export class ExperienceTransactionController {
    constructor(
        private commandService: ExperienceTransactionCommandService,
        private queryService: ExperienceTransactionQueryService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async store(
        @Query() references: ReferencesType,
        @Body() payload: ExperienceTransactionPayload,
    ): Promise<void> {
        const completePayload: CompletePayloadType = {
            ...payload,
            ...references,
        };

        await this.commandService.store(completePayload);
    }

    @Get()
    async index(): Promise<ExperienceTransaction[]> {
        const experienceTransactions = await this.queryService.index();

        return experienceTransactions;
    }

    @Get("/single")
    async show(
        @Query("id") id: string,
    ): Promise<ExperienceTransaction> {
        const experienceTransaction = await this.queryService.show(id);

        return experienceTransaction;
    }

    @Put()
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(
        @Query("id") id: string,
        @Body() payload: Partial<ExperienceTransactionPayload>,
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
