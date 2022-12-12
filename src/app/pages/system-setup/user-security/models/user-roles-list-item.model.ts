import { claim } from './claim-module.model';

export interface UserRolesListItem {
    id: string;
    name: string;
    description: string;
    claims: claim[];
}