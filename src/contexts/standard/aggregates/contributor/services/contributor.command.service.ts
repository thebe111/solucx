import { Injectable } from "@nestjs/common";
import { ContributorPayload } from "./../dto/contributor.dto";
import { Contributor } from "./../domain/contributor.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ContributorCommandService {
    constructor(
        @InjectRepository(Contributor)
        private repository: Repository<Contributor>,
    ) {}

    store(payload: ContributorPayload) {
        const contributor = this.repository.create(payload);

        return this.repository.save(contributor);
    }

    update(id: string, payload: ContributorPayload) {
        return this.repository.update(id, payload);
    }

    destroy(id: string) {
        return this.repository.update(id, { deleted: true });
    }
}
