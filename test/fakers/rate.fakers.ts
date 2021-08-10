import { Rate } from "./../../src/contexts/standard/aggregates/rate/domain/rate.entity";
import * as exceptions from "./../../src/contexts/standard/aggregates/rate/domain/rate.exceptions";

export const fakerDatabase: Rate[] = [
    new Rate({
        id: "1",
        score: 7,
        comment: "lorem ipsum",
        deleted: false,
    }),
    new Rate({
        id: "2",
        score: 8,
        comment: "hello world",
        deleted: false,
    }),
    new Rate({
        id: "3",
        score: 9,
        comment: "dorime",
        deleted: false,
    }),
];

export const fakerCommandService = {
    store: jest.fn().mockImplementation((payload) => {
        const experienceTransaction = fakerDatabase.filter((item) =>
            item.id == payload.idExperienceTransaction ? item : null,
        )[0];

        if (!experienceTransaction) {
            throw new exceptions.InvalidExperienceTransactionReference(404);
        }

        return null;
    }),
    update: jest.fn().mockImplementation(() => null),
    destroy: jest.fn().mockImplementation(() => null),
};

export const fakerQueryService = {
    index: jest.fn(() => fakerDatabase),
    show: jest.fn(
        (id) =>
            fakerDatabase.filter((item) => (item.id == id ? item : null))[0],
    ),
};

export const fakerRepository = {
    create: jest.fn().mockImplementation((payload) => payload),
    save: jest.fn().mockImplementation(() => null),
    find: jest.fn().mockImplementation(() => Promise.resolve(fakerDatabase)),
    findOne: jest
        .fn()
        .mockImplementation((id) =>
            Promise.resolve(
                fakerDatabase.filter((item) =>
                    item.id == id ? item : null,
                )[0],
            ),
        ),
    update: jest.fn().mockImplementation(() => null),
};
