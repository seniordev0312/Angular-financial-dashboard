import { NavigationLink } from "./navigation-link";

export class NavigationDropdown {
    type: 'link' | 'dropdown';
    icon: string;
    translationKey: string;
    subRouteItems: NavigationLink[];
    upperRoute: boolean;
    sidenavLink?: string;
}