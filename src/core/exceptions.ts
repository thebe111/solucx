import {
    HttpException,
    HttpStatus,
    ExceptionFilter,
    Catch,
    ArgumentsHost,
} from "@nestjs/common";
import { Response } from "express";

export abstract class ServerException extends HttpException {
    constructor(
        message: string,
        statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR,
    ) {
        super(
            {
                error: true,
                message: message,
                payload: null,
            },
            statusCode,
        );
    }
}

export class InvalidArguments extends ServerException {
    constructor(statusCode?: number) {
        super("the request contains invalid data", statusCode);
    }
}

@Catch()
export class HideNonMappedException implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>();

        if (!(exception instanceof ServerException)) {
            return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
                error: true,
                message: "unknown error",
                payload: null,
            });
        }

        return response
            .status(exception.getStatus())
            .json(exception.getResponse());
    }
}
