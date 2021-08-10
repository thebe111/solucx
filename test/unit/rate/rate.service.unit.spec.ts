import { Test, TestingModule } from "@nestjs/testing";
import { Rate } from "./../../../src/contexts/standard/aggregates/rate/domain/rate.entity";
import { RateCommandService } from "./../../../src/contexts/standard/aggregates/rate/services/rate.command.service";
import { RateQueryService } from "./../../../src/contexts/standard/aggregates/rate/services/rate.query.service";
import { fakerRepository } from "./../../fakers/rate.fakers";
import { getRepositoryToken } from "@nestjs/typeorm";
import { ExperienceTransactionQueryService } from "./../../../src/contexts/standard/aggregates/experienceTransaction/services/experienceTransaction.query.service";
import { fakerQueryService as fakerExperienceTransactionQueryService } from "./../../fakers/experienceTransaction.fakers";
import * as exceptions from "./../../../src/contexts/standard/aggregates/rate/domain/rate.exceptions";
import * as faker from "faker";

describe("RateService", () => {
    let rateCommandService: RateCommandService;
    let rateQueryService: RateQueryService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                RateQueryService,
                RateCommandService,
                {
                    provide: getRepositoryToken(Rate),
                    useValue: fakerRepository,
                },
                {
                    provide: ExperienceTransactionQueryService,
                    useValue: fakerExperienceTransactionQueryService,
                },
            ],
        }).compile();

        rateCommandService = app.get<RateCommandService>(RateCommandService);
        rateQueryService = app.get<RateQueryService>(RateQueryService);
    });

    it("should be defined", () => {
        expect(rateCommandService).toBeDefined();
        expect(rateQueryService).toBeDefined();
    });

    describe("commands", () => {
        describe("store", () => {
            it("should call rate's repository create/ save methods", async () => {
                await rateCommandService.store({
                    score: 5,
                    comment: "testing",
                    idExperienceTransaction: "1",
                });

                expect(fakerRepository.create).toHaveBeenCalled();
                expect(fakerRepository.save).toHaveBeenCalled();
            });
        });

        describe("update", () => {
            it("should call rate's repository update method", async () => {
                await rateCommandService.update("1", {
                    score: 7,
                    comment: "testing",
                });

                expect(fakerRepository.update).toHaveBeenCalled();
            });
        });

        describe("destroy", () => {
            it("should call rate's update method", async () => {
                await rateCommandService.destroy("2");

                expect(fakerRepository.update).toHaveBeenCalled();
            });
        });
    });

    describe("queries", () => {
        describe("index", () => {
            it("should return a rate entity list", async () => {
                const response = await rateQueryService.index();

                expect(response).toHaveLength(3);
                expect(fakerRepository.find).toHaveBeenCalled();
            });
        });

        describe("show", () => {
            it("should return a rate entity", async () => {
                const response = await rateQueryService.show("1");

                expect(response.score).toEqual(7);
                expect(response.comment).toEqual("lorem ipsum");
                expect(fakerRepository.findOne).toHaveBeenCalled();
            });

            it("should raise unknown rate", async () => {
                await expect(
                    rateQueryService.show(faker.datatype.uuid()),
                ).rejects.toThrow(exceptions.UnknownRate);
            });
        });
    });
});
