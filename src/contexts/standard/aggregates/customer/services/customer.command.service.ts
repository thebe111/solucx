import { Injectable } from "@nestjs/common";
import { CustomerPayload } from "./../dto/customer.dto";
import { Customer } from "./../domain/customer.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CustomerCommandService {
    constructor(
        @InjectRepository(Customer)
        private repository: Repository<Customer>,
    ) {}

    store(payload: CustomerPayload) {
        const customer = this.repository.create(payload);

        return this.repository.save(customer);
    }

    update(id: string, payload: Partial<CustomerPayload>) {
        return this.repository.update(id, payload);
    }

    destroy(id: string) {
        return this.repository.update(id, { deleted: true });
    }
}
