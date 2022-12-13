import { Claim } from "./claim.model";

export class ClaimList {
    pageSize: number;
    totalCount: number;
    claims: Claim[];
}