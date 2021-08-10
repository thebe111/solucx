import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Contributor } from "./../domain/contributor.entity";
import * as exceptions from "./../domain/contributor.exceptions";

@Injectable()
export class ContributorQueryService {
    constructor(
        @InjectRepository(Contributor)
        private repository: Repository<Contributor>,
    ) {}

    index() {
        return this.repository.find({ where: { deleted: false } });
    }

    async show(id: string) {
        const contributor = await this.repository.findOne(id, {
            where: { deleted: false },
        });

        if (!contributor) {
            throw new exceptions.UnknownContributor(404, id);
        }

        return contributor;
    }
}
