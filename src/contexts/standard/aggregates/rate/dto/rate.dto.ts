import { Min, Max, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RatePayload {
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    @Max(10)
    score: number;

    @IsString()
    @IsNotEmpty()
    comment: string;
}
