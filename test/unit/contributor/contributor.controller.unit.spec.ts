import { Test, TestingModule } from "@nestjs/testing";
import * as httpMock from "node-mocks-http";
import { ContributorController } from "./../../../src/contexts/standard/aggregates/contributor/entrypoint/rest/contributor.controller";
import { ContributorCommandService } from "./../../../src/contexts/standard/aggregates/contributor/services/contributor.command.service";
import { ContributorQueryService } from "./../../../src/contexts/standard/aggregates/contributor/services/contributor.query.service";
import {
    fakerDatabase,
    fakerCommandService,
    fakerQueryService,
} from "./../../fakers/contributor.fakers";

describe("ContributorController", () => {
    let contributorController: ContributorController;
    let contributorCommandService: ContributorCommandService;
    let contributorQueryService: ContributorQueryService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [ContributorController],
            providers: [
                {
                    provide: ContributorCommandService,
                    useValue: fakerCommandService,
                },
                {
                    provide: ContributorQueryService,
                    useValue: fakerQueryService,
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
            it("should call service's store method", async () => {
                await contributorController.store({
                    name: "ralph",
                });

                expect(fakerCommandService.store).toHaveBeenCalled();
            });
        });

        describe("update", () => {
            it("should call service's update method", async () => {
                await contributorController.update("1", {
                    name: "ralph",
                });

                expect(fakerCommandService.update).toHaveBeenCalled();
            });
        });

        describe("destroy", () => {
            it("should call service's destroy method", async () => {
                await contributorController.destroy("1");

                expect(fakerCommandService.destroy).toHaveBeenCalled();
            });
        });
    });

    describe("queries", () => {
        describe("index", () => {
            it("should return a contributor entity list", async () => {
                const response = await contributorController.index();

                expect(response).toEqual(fakerDatabase);
                expect(fakerQueryService.index).toHaveBeenCalled();
            });
        });

        describe("show", () => {
            it("should return a contributor entity", async () => {
                const response = await contributorController.show("1");

                expect(response).toEqual(
                    fakerDatabase[0],
                );
                expect(fakerQueryService.show).toHaveBeenCalled();
            });
        });
    });
});
