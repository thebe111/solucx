import { Test, TestingModule } from "@nestjs/testing";
import * as httpMock from "node-mocks-http";
import { Contributor } from "./../../src/contexts/standard/aggregates/contributor/domain/contributor.entity";
import { ContributorController } from "./../../src/contexts/standard/aggregates/contributor/entrypoint/rest/contributor.controller";
import { ContributorCommandService } from "./../../src/contexts/standard/aggregates/contributor/services/contributor.command.service";
import { ContributorQueryService } from "./../../src/contexts/standard/aggregates/contributor/services/contributor.query.service";
import { fakerDatabase, fakerRepository } from "./../fakers/contributor.fakers";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("ContributorModule (integration)", () => {
    let contributorController: ContributorController;
    let contributorCommandService: ContributorCommandService;
    let contributorQueryService: ContributorQueryService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ContributorController],
            providers: [
                ContributorCommandService,
                ContributorQueryService,
                {
                    provide: getRepositoryToken(Contributor),
                    useValue: fakerRepository,
                },
            ],
        }).compile();

        contributorController = app.get<ContributorController>(
            ContributorController,
        );
        contributorCommandService = app.get<ContributorCommandService>(
            ContributorCommandService,
        );
        contributorQueryService = app.get<ContributorQueryService>(
            ContributorQueryService,
        );
    });

    it("should be defined", () => {
        expect(contributorController).toBeDefined();
        expect(contributorCommandService).toBeDefined();
        expect(contributorQueryService).toBeDefined();
    });

    describe("commands", () => {
        describe("store", () => {
            it("should perform store method", async () => {
               const spyController = jest.spyOn(contributorController, "store");
               const spyService = jest.spyOn(contributorCommandService, "store");

                await contributorController.store({
                    name: "bart",
                });

                expect(spyController).toHaveBeenCalled();
                expect(spyService).toHaveBeenCalled();
            });
        });

        describe("update", () => {
            it("should perform update method", async () => {
               const spyController = jest.spyOn(contributorController, "update");
               const spyService = jest.spyOn(contributorCommandService, "update");

                await contributorController.update("1", {
                    name: "bart",
                });

                expect(spyController).toHaveBeenCalled();
                expect(spyService).toHaveBeenCalled();
            });
        });

        describe("destroy", () => {
            it("should perform destroy method", async () => {
               const spyController = jest.spyOn(contributorController, "destroy");
               const spyService = jest.spyOn(contributorCommandService, "destroy");

                await contributorController.destroy("1");

                expect(spyController).toHaveBeenCalled();
                expect(spyService).toHaveBeenCalled();
            });
        });
    });

    describe("queries", () => {
        describe("index", () => {
            it("should return a contributor entity list", async () => {
                const response = await contributorController.index();

                expect(response).toEqual(fakerDatabase);
            });
        });

        describe("show", () => {
            it("should return a contributor entity", async () => {
                const response = await contributorController.show("1");

                expect(response).toEqual(
                    fakerDatabase[0],
                );
            });
        });
    });
});
