import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Customer } from "./../domain/customer.entity";
import * as exceptions from "./../domain/customer.exceptions";

@Injectable()
export class CustomerQueryService {
    constructor(
        @InjectRepository(Customer)
        private repository: Repository<Customer>,
    ) {}

    index() {
        return this.repository.find({ where: { deleted: false } });
    }

    async show(id: string) {
        const customer = await this.repository.findOne(id, {
            where: { deleted: false },
        });

        if (!customer) {
            throw new exceptions.UnknownCustomer(404, id);
        }

        return customer;
    }
}
