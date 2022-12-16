import { Claim } from "./claim.model";

export interface AddRole {
    id?: string;
    name: string;
    claims: Claim[];
}