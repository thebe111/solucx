import { Test, TestingModule } from "@nestjs/testing";
import * as httpMock from "node-mocks-http";
import { Rate } from "./../../src/contexts/standard/aggregates/rate/domain/rate.entity";
import { RateController } from "./../../src/contexts/standard/aggregates/rate/entrypoint/rest/rate.controller";
import { RateCommandService } from "./../../src/contexts/standard/aggregates/rate/services/rate.command.service";
import { RateQueryService } from "./../../src/contexts/standard/aggregates/rate/services/rate.query.service";
import { fakerDatabase, fakerRepository } from "./../fakers/rate.fakers";
import { getRepositoryToken } from "@nestjs/typeorm";
import { fakerQueryService as fakerExperienceTransactionQueryService } from "./../fakers/experienceTransaction.fakers";
import { ExperienceTransactionQueryService } from "./../../src/contexts/standard/aggregates/experienceTransaction/services/experienceTransaction.query.service";

describe("RateModule (integration)", () => {
    let rateController: RateController;
    let rateCommandService: RateCommandService;
    let rateQueryService: RateQueryService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [RateController],
            providers: [
                RateCommandService,
                RateQueryService,
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

        rateController = app.get<RateController>(RateController);
        rateCommandService = app.get<RateCommandService>(RateCommandService);
        rateQueryService = app.get<RateQueryService>(RateQueryService);
    });

    it("should be defined", () => {
        expect(rateController).toBeDefined();
        expect(rateCommandService).toBeDefined();
        expect(rateQueryService).toBeDefined();
    });

    describe("commands", () => {
        describe("store", () => {
            it("should perform store method", async () => {
               const spyController = jest.spyOn(rateController, "store");
               const spyService = jest.spyOn(rateCommandService, "store");

                await rateController.store("1", {
                    score: 8,
                    comment: "lorem ipsum",
                });

                expect(spyController).toHaveBeenCalled();
                expect(spyService).toHaveBeenCalled();
            });
        });

        describe("update", () => {
            it("should perform update method", async () => {
               const spyController = jest.spyOn(rateController, "update");
               const spyService = jest.spyOn(rateCommandService, "update");

                await rateController.update("1", {
                    score: 6,
                    comment: "hello world",
                });

                expect(spyController).toHaveBeenCalled();
                expect(spyService).toHaveBeenCalled();
            });
        });

        describe("destroy", () => {
            it("should perform destroy method", async () => {
               const spyController = jest.spyOn(rateController, "destroy");
               const spyService = jest.spyOn(rateCommandService, "destroy");

                await rateController.destroy("1");

                expect(spyController).toHaveBeenCalled();
                expect(spyService).toHaveBeenCalled();
            });
        });
    });

    describe("queries", () => {
        describe("index", () => {
            it("should return a rate entity list", async () => {
                const response = await rateController.index();

                expect(response).toEqual(fakerDatabase);
            });
        });

        describe("show", () => {
            it("should return a rate entity", async () => {
                const response = await rateController.show("1");

                expect(response).toEqual(
                    fakerDatabase[0],
                );
            });
        });
    });
});
