import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Rate } from "./../domain/rate.entity";
import * as exceptions from "./../domain/rate.exceptions";

@Injectable()
export class RateQueryService {
    constructor(
        @InjectRepository(Rate)
        private repository: Repository<Rate>,
    ) {}

    index() {
        return this.repository.find({ where: { deleted: false } });
    }

    async show(id: string) {
        const rate = await this.repository.findOne(id, {
            where: { deleted: false },
        });

        if (!rate) {
            throw new exceptions.UnknownRate(404, id);
        }

        return rate;
    }
}
