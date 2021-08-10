import { TypeOrmModule } from "@nestjs/typeorm";
import { ExperienceTransaction } from "./../../src/contexts/standard/aggregates/experienceTransaction/domain/experienceTransaction.entity";
import { Contributor } from "./../../src/contexts/standard/aggregates/contributor/domain/contributor.entity";
import { Customer } from "./../../src/contexts/standard/aggregates/customer/domain/customer.entity";
import { Shop } from "./../../src/contexts/standard/aggregates/shop/domain/shop.entity";
import { Rate } from "./../../src/contexts/standard/aggregates/rate/domain/rate.entity";

export const fakerDatabaseConnection = TypeOrmModule.forRoot({
    type: "sqlite",
    database: ":memory:",
    entities: [Contributor, ExperienceTransaction, Customer, Shop, Rate],
    synchronize: true,
});
