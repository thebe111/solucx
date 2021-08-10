import { Contributor } from "./../../src/contexts/standard/aggregates/contributor/domain/contributor.entity";

export const fakerDatabase: Contributor[] = [
    new Contributor({
        id: "1",
        name: "lisa",
        deleted: false,
    }),
    new Contributor({
        id: "2",
        name: "maggie",
        deleted: false,
    }),
    new Contributor({
        id: "3",
        name: "marge",
        deleted: false,
    }),
];

export const fakerCommandService = {
    store: jest.fn().mockImplementation(() => null),
    update: jest.fn().mockImplementation(() => null),
    destroy: jest.fn().mockImplementation(() => null),
};

export const fakerQueryService = {
    index: jest.fn(() => fakerDatabase),
    show: jest.fn((id) =>
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
