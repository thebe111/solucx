import { IsNotEmpty, IsString } from "class-validator";

export class ContributorPayload {
    @IsString()
    @IsNotEmpty()
    name: string;
}
