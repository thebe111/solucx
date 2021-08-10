import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ExperienceTransaction } from "./../domain/experienceTransaction.entity";
import * as exceptions from "./../domain/experienceTransaction.exceptions";

@Injectable()
export class ExperienceTransactionQueryService {
    constructor(
        @InjectRepository(ExperienceTransaction)
        private repository: Repository<ExperienceTransaction>,
    ) {}

    index() {
        return this.repository.find({ where: { deleted: false } });
    }

    async show(id: string) {
        const experienceTransaction = await this.repository.findOne(id, {
            where: { deleted: false },
        });

        if (!experienceTransaction) {
            throw new exceptions.UnknownExperienceTransaction(404, id);
        }

        return experienceTransaction;
    }
}
