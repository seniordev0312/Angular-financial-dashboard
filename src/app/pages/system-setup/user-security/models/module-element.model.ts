import { ClaimElement } from "./claim-element.model";

export interface ModuleElement {
    claimType: string;
    totalCount: number;
    value: string
    clientClaims: ClaimElement[];
}