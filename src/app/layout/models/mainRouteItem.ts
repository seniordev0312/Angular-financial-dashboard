import { SubRouteItem } from "./subRouteItem";

export class MainRouteItem {
    icon: string;
    navigateLink?: string;
    translationKey: string;
    subRouteItems?: SubRouteItem[];
    upperRoute: boolean;
}