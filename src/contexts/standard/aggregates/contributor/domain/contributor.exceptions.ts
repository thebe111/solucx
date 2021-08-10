import { ServerException } from "./../../../../../core/exceptions";

export class UnknownContributor extends ServerException {
    constructor(statusCode?: number, id?: string) {
        super(`contributor with ID: ${id}, not found`, statusCode);
    }
}
