import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { ContributorModule } from "./../../src/contexts/standard/aggregates/contributor/entrypoint/contributor.module";
import { fakerDatabaseConnection } from "./../fakers/database.fakers";

describe("ContributorModule (e2e)", () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [ContributorModule, fakerDatabaseConnection],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await app.close();
    });

    it("/contributors (POST)", async () => {
        const response = await request(app.getHttpServer())
            .post("/contributors")
            .send({ name: "homer" })
            .expect(201);
    });

    it("/contributors (GET)", async () => {
        await request(app.getHttpServer())
            .post("/contributors")
            .send({ name: "homer" });

        const response = await request(app.getHttpServer())
            .get("/contributors")
            .expect(200);

        expect(response.body).toHaveLength(1);
    });

    // TODO: implement show. update and destroy tests
});
