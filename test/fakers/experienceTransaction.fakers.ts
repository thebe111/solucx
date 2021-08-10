import { ExperienceTransaction } from "./../../src/contexts/standard/aggregates/experienceTransaction/domain/experienceTransaction.entity";

export const fakerDatabase: ExperienceTransaction[] = [
    new ExperienceTransaction({
        id: "1",
        transactionDate: new Date(),
    }),
    new ExperienceTransaction({
        id: "2",
        transactionDate: new Date(),
    }),
    new ExperienceTransaction({
        id: "3",
        transactionDate: new Date(),
    }),
];

export const fakerQueryService = {
    show: jest.fn(
        (id) =>
            fakerDatabase.filter((item) => (item.id == id ? item : null))[0],
    ),
};
