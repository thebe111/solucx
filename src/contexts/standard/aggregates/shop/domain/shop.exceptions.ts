import { ServerException } from "./../../../../../core/exceptions";

export class UnknownShop extends ServerException {
    constructor(statusCode?: number, id?: string) {
        super(`shop with ID: ${id}, not found`, statusCode);
    }
}
