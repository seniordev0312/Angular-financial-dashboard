import { ClientClaim } from "./client-claims.model";

export interface Module {
    claimType: string;
    totalCount: number;
    value: string
    clientClaims: ClientClaim[];
}