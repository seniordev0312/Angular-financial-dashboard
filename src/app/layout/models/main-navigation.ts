import { NavigationDropdown } from "./navigation-dropdown";
import { NavigationLink } from "./navigation-link";

export class MainNavigation {
    upper: Array<NavigationLink | NavigationDropdown>;
    lower: Array<NavigationLink | NavigationDropdown>;
}