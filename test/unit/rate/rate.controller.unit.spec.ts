import { Test, TestingModule } from "@nestjs/testing";
import * as httpMock from "node-mocks-http";
import { RateController } from "./../../../src/contexts/standard/aggregates/rate/entrypoint/rest/rate.controller";
import { RateCommandService } from "./../../../src/contexts/standard/aggregates/rate/services/rate.command.service";
import { RateQueryService } from "./../../../src/contexts/standard/aggregates/rate/services/rate.query.service";
import {
    fakerDatabase,
    fakerCommandService,
    fakerQueryService,
} from "./../../fakers/rate.fakers";
import * as faker from "faker";
import * as exceptions from "./../../../src/contexts/standard/aggregates/rate/domain/rate.exceptions";

describe("RateController", () => {
    let contributorController: RateController;
    let contributorCommandService: RateCommandService;
    let contributorQueryService: RateQueryService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [RateController],
            providers: [
                {
                    provide: RateCommandService,
                    useValue: fakerCommandService,
                },
                {
                    provide: RateQueryService,
                    useValue: fakerQueryService,
                },
            ],
        }).compile();

        contributorController = app.get<RateController>(RateController);
        contributorCommandService =
            app.get<RateCommandService>(RateCommandService);
        contributorQueryService = app.get<RateQueryService>(RateQueryService);
    });

    it("should be defined", () => {
        expect(contributorController).toBeDefined();
        expect(contributorCommandService).toBeDefined();
        expect(contributorQueryService).toBeDefined();
    });

    describe("commands", () => {
        describe("store", () => {
            it("should call service's store method", async () => {
                await contributorController.store("1", {
                    score: 5,
                    comment: "testing",
                });

                expect(fakerCommandService.store).toHaveBeenCalled();
            });

            it("should raise invalid experience transaction reference", async () => {
                await expect(
                    contributorController.store(
                        faker.datatype.uuid(),
                        {
                            score: 3,
                            comment: "testing",
                        },
                    ),
                ).rejects.toThrow(
                    exceptions.InvalidExperienceTransactionReference,
                );
            });
        });

        describe("update", () => {
            it("should call service's update method", async () => {
                await contributorController.update("1", {
                    score: 5,
                    comment: "testing",
                });

                expect(fakerCommandService.update).toHaveBeenCalled();
            });
        });

        describe("destroy", () => {
            it("should call service's destroy method", async () => {
                await contributorController.destroy(
                    faker.datatype.uuid(),
                );

                expect(fakerCommandService.destroy).toHaveBeenCalled();
            });
        });
    });

    describe("queries", () => {
        describe("index", () => {
            it("should return a rate entity list", async () => {
                const response = await contributorController.index();

                expect(response).toEqual(fakerDatabase);
                expect(fakerQueryService.index).toHaveBeenCalled();
            });
        });

        describe("show", () => {
            it("should return a rate entity", async () => {
                const response = await contributorController.show("1");

                expect(response).toEqual(
                    fakerDatabase[0],
                );
                expect(fakerQueryService.show).toHaveBeenCalled();
            });
        });
    });
});
