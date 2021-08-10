import { ServerException } from "./../../../../../core/exceptions";

export class UnknownRate extends ServerException {
    constructor(statusCode?: number, id?: string) {
        super(`rate with ID: ${id}, not found`, statusCode);
    }
}

export class InvalidExperienceTransactionReference extends ServerException {
    constructor(statusCode?: number) {
        super(`invalid experience transaction reference ID`, statusCode);
    }
}
