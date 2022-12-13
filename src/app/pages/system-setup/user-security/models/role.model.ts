import { ClaimList } from "./claim-list.model";

export class Role {
    name: string;
    id: string;
    claimList?: ClaimList[];
}