import { registerDecorator, ValidationOptions } from "class-validator";

// FONT: <https://github.com/fdaciuk/iscpf/blob/main/src/is-cpf.ts> - CPF
// validation rules
type MultiplyDigits = (digit: string, index: number) => number;

const multiplyDigits = (factor: number): MultiplyDigits => {
    return (digit, index) => {
        return Number(digit) * (factor - index);
    };
};

const sumDigits = (first: number, second: number): number => {
    return first + second;
};

const getVerificationDigit = (value: number): number => {
    const rest = value % 11;
    return rest < 2 ? 0 : 11 - rest;
};

const isValidCPF = (CPF: string): boolean => {
    const isSameNumber = CPF.match(/^(\d)\1{10}$/);

    if (isSameNumber) {
        return false;
    }

    const brokenCPF = CPF.match(/^(\d{9})(\d{2})$/);
    const withoutDigits = brokenCPF![1].split("");
    const digits = brokenCPF![2];

    const tempFirstDigit = withoutDigits
        .map(multiplyDigits(10))
        .reduce(sumDigits, 0);

    const firstDigit = getVerificationDigit(tempFirstDigit);

    const tempSecondDigit = withoutDigits
        .concat(String(firstDigit))
        .map(multiplyDigits(11))
        .reduce(sumDigits, 0);

    const secondDigit = getVerificationDigit(tempSecondDigit);

    return `${firstDigit}${secondDigit}` === digits;
};

const validateCPF = (CPF: string): boolean => {
    const cleanCPF = String(CPF).replace(/\D+/g, "");

    return cleanCPF.length === 11 && isValidCPF(cleanCPF);
};

export function IsValidCPF(validationOptions?: ValidationOptions) {
    return (object: Record<string, any>, propertyName: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            constraints: [],
            options: validationOptions,
            validator: {
                validate(value: any) {
                    return validateCPF(value);
                },
            },
        });
    };
}
