import { IsNotEmpty, IsCurrency, IsDate } from "class-validator";
import { Type } from "class-transformer";

export class ExperienceTransactionPayload {
    @Type(() => Date)
    @IsDate()
    @IsNotEmpty()
    transactionDate: Date;

    @IsCurrency({ symbol: "R$" })
    value: string;
}
