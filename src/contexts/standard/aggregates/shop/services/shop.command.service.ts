import { Injectable } from "@nestjs/common";
import { ShopPayload } from "./../dto/shop.dto";
import { Shop } from "./../domain/shop.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ShopCommandService {
    constructor(
        @InjectRepository(Shop)
        private repository: Repository<Shop>,
    ) {}

    store(payload: ShopPayload) {
        const shop = this.repository.create(payload);

        return this.repository.save(shop);
    }

    update(id: string, payload: ShopPayload) {
        return this.repository.update(id, payload);
    }

    destroy(id: string) {
        return this.repository.update(id, { deleted: true });
    }
}
