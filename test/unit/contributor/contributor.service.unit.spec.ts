import { Test, TestingModule } from "@nestjs/testing";
import { Contributor } from "./../../../src/contexts/standard/aggregates/contributor/domain/contributor.entity";
import { ContributorCommandService } from "./../../../src/contexts/standard/aggregates/contributor/services/contributor.command.service";
import { ContributorQueryService } from "./../../../src/contexts/standard/aggregates/contributor/services/contributor.query.service";
import { fakerRepository } from "./../../fakers/contributor.fakers";
import { getRepositoryToken } from "@nestjs/typeorm";
import * as exceptions from "./../../../src/contexts/standard/aggregates/contributor/domain/contributor.exceptions";
import * as faker from "faker";

describe("ContributorService", () => {
    let contributorCommandService: ContributorCommandService;
    let contributorQueryService: ContributorQueryService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            providers: [
                ContributorQueryService,
                ContributorCommandService,
                {
                    provide: getRepositoryToken(Contributor),
                    useValue: fakerRepository,
                },
            ],
        }).compile();

        contributorCommandService = app.get<ContributorCommandService>(
            ContributorCommandService,
        );
        contributorQueryService = app.get<ContributorQueryService>(
            ContributorQueryService,
        );
    });

    it("should be defined", () => {
        expect(contributorCommandService).toBeDefined();
        expect(contributorQueryService).toBeDefined();
    });

    describe("commands", () => {
        describe("store", () => {
            it("should call contributor's create/ save method", async () => {
                await contributorCommandService.store({
                    name: "duff",
                });

                expect(fakerRepository.create).toHaveBeenCalled();
                expect(fakerRepository.save).toHaveBeenCalled();
            });
        });

        describe("update", () => {
            it("should call contributor's repository update method", async () => {
                await contributorCommandService.update("1", {
                    name: "arthur",
                });

                expect(fakerRepository.update).toHaveBeenCalled();
            });
        });

        describe("destroy", () => {
            it("should call contributor's repository update method", async () => {
                await contributorCommandService.destroy("2");

                expect(fakerRepository.update).toHaveBeenCalled();
            });
        });
    });

    describe("queries", () => {
        describe("index", () => {
            it("should return a contributor entity list", async () => {
                const response = await contributorQueryService.index();

                expect(response).toHaveLength(3);
                expect(fakerRepository.find).toHaveBeenCalled();
            });
        });

        describe("show", () => {
            it("should return a contributor entity", async () => {
                const response = await contributorQueryService.show("1");

                expect(response.name).toEqual("lisa");
                expect(fakerRepository.findOne).toHaveBeenCalled();
            });

            it("should raise unknown contributor", async () => {
                await expect(
                    contributorQueryService.show(faker.datatype.uuid()),
                ).rejects.toThrow(exceptions.UnknownContributor);
            });
        });
    });
});
