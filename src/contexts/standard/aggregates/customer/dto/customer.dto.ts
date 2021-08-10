import { IsNotEmpty, Matches, IsString, IsEmail } from "class-validator";
import { IsValidCPF } from "./../domain/validators/cpf.validator";

export class CustomerPayload {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Matches(/\(\d{2}\) \d{4,5}-\d{4}/)
    @IsNotEmpty()
    telephone: string;

    @IsValidCPF()
    @IsNotEmpty()
    CPF: string;
}
