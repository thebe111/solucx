import { Injectable } from "@nestjs/common";
import { ExperienceTransactionPayload } from "./../dto/experienceTransaction.dto";
import { ExperienceTransaction } from "./../domain/experienceTransaction.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ContributorQueryService } from "./../../contributor/services/contributor.query.service";
import { CustomerQueryService } from "./../../customer/services/customer.query.service";
import { ShopQueryService } from "./../../shop/services/shop.query.service";
import { CompletePayloadType } from "./../types/completePayload";
import * as exceptions from "./../domain/experienceTransaction.exceptions";

@Injectable()
export class ExperienceTransactionCommandService {
    constructor(
        @InjectRepository(ExperienceTransaction)
        private repository: Repository<ExperienceTransaction>,

        private contributorQueryService: ContributorQueryService,
        private customerQueryService: CustomerQueryService,
        private shopQueryService: ShopQueryService,
    ) {}

    async store(payload: CompletePayloadType) {
        const [contributor, customer, shop] = await Promise.all([
            this.contributorQueryService.show(payload.idContributor),
            this.customerQueryService.show(payload.idCustomer),
            this.shopQueryService.show(payload.idShop),
        ]).catch(() => {
            throw new exceptions.InvalidReferences(404);
        });

        const fetchedPayload = {
            ...payload,
            contributor,
            customer,
            shop,
        };

        const experienceTransaction = this.repository.create(fetchedPayload);

        return this.repository.save(experienceTransaction);
    }

    update(id: string, payload: Partial<ExperienceTransactionPayload>) {
        return this.repository.update(id, payload);
    }

    destroy(id: string) {
        return this.repository.update(id, { deleted: true });
    }
}
