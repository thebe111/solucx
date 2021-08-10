import { ServerException } from "./../../../../../core/exceptions";

export class UnknownCustomer extends ServerException {
    constructor(statusCode?: number, id?: string) {
        super(`customer with ID: ${id}, not found`, statusCode);
    }
}
