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
import { CustomerCommandService } from "./../../services/customer.command.service";
import { CustomerQueryService } from "./../../services/customer.query.service";
import { CustomerPayload } from "./../../dto/customer.dto";
import {Customer} from "../../domain/customer.entity";

@Controller("customers")
export class CustomerController {
    constructor(
        private commandService: CustomerCommandService,
        private queryService: CustomerQueryService,
    ) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async store(
        @Body() payload: CustomerPayload,
    ): Promise<void> {
        await this.commandService.store(payload);
    }

    @Get()
    async index(): Promise<Customer[]> {
        const customers = await this.queryService.index();

        return customers;
    }

    @Get("/single")
    async show(
        @Query("id") id: string,
    ): Promise<Customer> {
        const customer = await this.queryService.show(id);

        return customer;
    }

    @Put()
    @HttpCode(HttpStatus.NO_CONTENT)
    async update(
        @Query("id") id: string,
        @Body() payload: Partial<CustomerPayload>,
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
