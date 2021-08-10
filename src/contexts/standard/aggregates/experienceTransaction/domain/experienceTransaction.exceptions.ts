import { ServerException } from "./../../../../../core/exceptions";

export class UnknownExperienceTransaction extends ServerException {
    constructor(statusCode?: number, id?: string) {
        super(`experience transaction with ID: ${id}, not found`, statusCode);
    }
}

export class InvalidReferences extends ServerException {
    constructor(statusCode?: number) {
        super(`the request contains invalid references`, statusCode);
    }
}
