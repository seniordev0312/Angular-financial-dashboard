import { RoleModule } from './role-module.model';

export interface UserRolesListItem {
    id: string;
    role: string;
    description: string;
    modules: RoleModule[];
}