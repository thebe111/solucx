import { ReferencesType } from "./references";

export type CompletePayloadType = ReferencesType & {
    transactionDate: Date;
};
