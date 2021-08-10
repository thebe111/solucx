import { IsNotEmpty, IsString } from "class-validator";

export class ShopPayload {
    @IsString()
    @IsNotEmpty()
    name: string;
}
