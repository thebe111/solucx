import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Shop } from "./../domain/shop.entity";
import * as exceptions from "./../domain/shop.exceptions";

@Injectable()
export class ShopQueryService {
    constructor(
        @InjectRepository(Shop)
        private repository: Repository<Shop>,
    ) {}

    index() {
        return this.repository.find({ where: { deleted: false } });
    }

    async show(id: string) {
        const shop = await this.repository.findOne(id, {
            where: { deleted: false },
        });

        if (!shop) {
            throw new exceptions.UnknownShop(404, id);
        }

        return shop;
    }
}
