import {
    PipeTransform,
    Injectable,
    ArgumentMetadata,
    HttpStatus,
} from "@nestjs/common";
import { InvalidArguments } from "./exceptions";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";

@Injectable()
export class ValidateRequest implements PipeTransform<any> {
    async transform(value: any, { metatype }: ArgumentMetadata) {
        if (!metatype || !this._validate(metatype)) {
            return value;
        }

        const object = plainToClass(metatype, value);
        const errors = await validate(object);

        if (errors.length > 0) {
            throw new InvalidArguments(HttpStatus.NOT_FOUND);
        }

        return value;
    }

    private _validate(metatype: any): boolean {
        const types: any[] = [String, Boolean, Number, Array, Object];

        return !types.includes(metatype);
    }
}
