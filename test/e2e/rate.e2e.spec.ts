import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { RateModule } from "./../../src/contexts/standard/aggregates/rate/entrypoint/rate.module";
import { fakerDatabaseConnection } from "./../fakers/database.fakers";
import {ExperienceTransactionModule} from "./../../src/contexts/standard/aggregates/experienceTransaction/entrypoint/experienceTransaction.module";

describe("RateModule (e2e)", () => {
    let app: INestApplication;
    let idExperienceTransaction: string;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [ExperienceTransactionModule, RateModule, fakerDatabaseConnection],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        const contributor = await request(app.getHttpServer())
            .post("/customers")
            .send({
               name: "bart",
               email: "test@mail.com",
               telephone: "(12) 94002-8922",
               CPF: "304.001.040-91"
            })

        // idExperienceTransaction = await request(app.getHttpServer())
            // .post(`/experience-transactions?idCustomer=${null}&idContributor=${null}&idShop=${null}`)
            // .send({
               
            // })
    });

    afterEach(async () => {
        await app.close();
    });

    // FIXME: need to perform inserts and queries to retrieve aggregate ID
    // attribute correctly

    it("/rates (POST)", async () => {
        const response = await request(app.getHttpServer())
            .post(`/rates?idExperienceTransaction=${idExperienceTransaction}`)
            .send({ score: 7, comment: "testing" })
            .expect(201);
    });

    it("/rates (GET)", async () => {
        await request(app.getHttpServer())
            .post(`/rates?idExperienceTransaction=${0}`)
            .send({ name: "homer" });

        const response = await request(app.getHttpServer())
            .get("/rates")
            .expect(200);

        expect(response.body).toHaveLength(1);
    });
});
