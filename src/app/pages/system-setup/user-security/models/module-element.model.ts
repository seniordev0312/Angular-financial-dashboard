import { ClaimElement } from "./claim-element.model";

export interface ModuleElement {
    id: string;
    name: string;
    claims: ClaimElement[];
}