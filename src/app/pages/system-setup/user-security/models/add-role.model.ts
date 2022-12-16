import { Claim } from "./claim.model";

export interface AddRole {
    roleId?: string;
    roleName: string;
    claims: Claim[];
}