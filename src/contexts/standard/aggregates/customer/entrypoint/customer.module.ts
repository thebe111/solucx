import { Module } from "@nestjs/common";
import { CustomerController } from "./rest/customer.controller";
import { CustomerCommandService } from "./../services/customer.command.service";
import { CustomerQueryService } from "./../services/customer.query.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "./../domain/customer.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Customer])],
    controllers: [CustomerController],
    providers: [CustomerCommandService, CustomerQueryService],
    exports: [CustomerQueryService],
})
export class CustomerModule {}
