import { Injectable } from "@nestjs/common";
import { RatePayload } from "./../dto/rate.dto";
import { Rate } from "./../domain/rate.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ExperienceTransactionQueryService } from "./../../experienceTransaction/services/experienceTransaction.query.service";
import * as exceptions from "./../domain/rate.exceptions";
import { CompletePayloadType } from "./../types/completePayload";

@Injectable()
export class RateCommandService {
    constructor(
        @InjectRepository(Rate)
        private repository: Repository<Rate>,

        private experienceTransactionQueryService: ExperienceTransactionQueryService,
    ) {}

    async store(payload: CompletePayloadType) {
        const experienceTransaction =
            await this.experienceTransactionQueryService.show(
                payload.idExperienceTransaction,
            );

        if (!experienceTransaction) {
            throw new exceptions.InvalidExperienceTransactionReference(404);
        }

        const fetchedPayload = {
            score: payload.score,
            comment: payload.comment,
            experienceTransaction,
        };

        const rate = this.repository.create(fetchedPayload);

        return this.repository.save(rate);
    }

    update(id: string, payload: Partial<RatePayload>) {
        return this.repository.update(id, payload);
    }

    destroy(id: string) {
        return this.repository.update(id, { deleted: true });
    }
}
