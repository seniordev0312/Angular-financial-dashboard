import { Permission } from "@root/shared/models/enums/permissions.enum";

export class NavigationLink {
    type: 'link' | 'dropdown';
    navigateLink: string;
    translationKey: string;
    permission: Permission;
    icon?: string;
    upperRoute?: boolean;
}