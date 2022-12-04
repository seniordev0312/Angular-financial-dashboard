import { NavListItem } from "@root/shared/models/nav-list-item.model";

export const systemSetupNavigationList: NavListItem[] = [
    {
        transitionKey: 'system-setup.system-setup.general-system-settings',
        route: 'general-system-settings'
    },
    {
        transitionKey: 'system-setup.system-setup.system-claims',
        route: 'system-claims'
    },
    {
        transitionKey: 'system-setup.system-setup.user-security',
        route: 'user-security'
    },
    {
        transitionKey: 'system-setup.system-setup.company-setup',
        route: 'company-setup'
    },
    {
        transitionKey: 'system-setup.system-setup.company-structure',
        route: 'company-structure'
    },
    {
        transitionKey: 'system-setup.system-setup.chart-of-accounts',
        route: 'chart-of-accounts'
    },
    {
        transitionKey: 'system-setup.system-setup.reference-tables',
        route: 'reference-tables'
    }
]