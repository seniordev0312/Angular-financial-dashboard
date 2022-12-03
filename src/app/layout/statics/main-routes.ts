import { MainRoute } from "../models/mainRoute";


export const mainRoutesList: MainRoute = {
    upper: [
        {
            icon: 'dashboard',
            navigateLink: 'dashboard',
            translationKey: 'core.left-side-bar-back.dashboard',
            subRouteItems: [],
            upperRoute: true
        },
        {
            icon: 'customer-service',
            navigateLink: undefined,
            translationKey: 'core.left-side-bar-back.customer-service',
            subRouteItems: [
                {
                    navigateLink: 'customer-service',
                    translationKey: 'core.left-side-bar-back.customer-service'
                },
                {
                    navigateLink: 'insurance-renewals',
                    translationKey: 'core.left-side-bar-back.insurance-renewals'
                },
            ],
            upperRoute: true
        },
        {
            icon: 'insurance-underwriting',
            navigateLink: undefined,
            translationKey: 'core.left-side-bar-back.insurance-underwriting',
            subRouteItems: [
                {
                    navigateLink: 'general-insurance-underwriting',
                    translationKey: 'core.left-side-bar-back.general-insurance-underwriting'
                },
                {
                    navigateLink: 'motor-insurance-underwriting',
                    translationKey: 'core.left-side-bar-back.motor-insurance-underwriting'
                },
                {
                    navigateLink: 'medical-insurance-underwriting',
                    translationKey: 'core.left-side-bar-back.medical-insurance-underwriting'
                },
                {
                    navigateLink: 'life-insurance-underwriting',
                    translationKey: 'core.left-side-bar-back.life-insurance-underwriting'
                },
            ],
            upperRoute: true
        },
        {
            icon: 'accounting-and-finance',
            navigateLink: undefined,
            translationKey: 'core.left-side-bar-back.accounting-and-finance',
            subRouteItems: [
                {
                    navigateLink: 'cashier',
                    translationKey: 'core.left-side-bar-back.cashier',
                },
                {
                    navigateLink: 'general-accounting',
                    translationKey: 'core.left-side-bar-back.general-accounting',
                },
                {
                    navigateLink: 'accounts-payable',
                    translationKey: 'core.left-side-bar-back.accounts-payable',
                },
                {
                    navigateLink: 'finance-and-reporting',
                    translationKey: 'core.left-side-bar-back.finance-and-reporting',
                },
            ],
            upperRoute: true
        },
        {
            icon: 'human-resources',
            navigateLink: undefined,
            translationKey: 'core.left-side-bar-back.human-resources',
            subRouteItems: [
                {
                    navigateLink: 'payroll',
                    translationKey: 'core.left-side-bar-back.payroll'
                }
            ],
            upperRoute: true
        },
        {
            icon: 'correspondence',
            navigateLink: undefined,
            translationKey: 'core.left-side-bar-back.correspondence',
            subRouteItems: [
                {
                    navigateLink: 'correspondence-management',
                    translationKey: 'core.left-side-bar-back.correspondence-management',
                }
            ],
            upperRoute: true
        }
    ],
    lower: [
        {
            icon: 'activityLog',
            navigateLink: 'activity-log',
            translationKey: 'core.left-side-bar-back.activity-log',
            subRouteItems: [],
            upperRoute: false
        },
        {
            icon: 'product-management',
            navigateLink: 'product-management',
            translationKey: 'core.left-side-bar-back.product-management',
            subRouteItems: [],
            upperRoute: false
        },
        {
            icon: 'treaty',
            navigateLink: 'treaty-management',
            translationKey: 'core.left-side-bar-back.treaty-management',
            subRouteItems: [],
            upperRoute: false
        },
        {
            icon: 'entity-management',
            navigateLink: 'entity-management',
            translationKey: 'core.left-side-bar-back.entity-management',
            subRouteItems: [],
            upperRoute: false
        },
        {
            icon: 'settings',
            navigateLink: 'settings',
            translationKey: 'core.left-side-bar-back.settings',
            subRouteItems: [],
            upperRoute: false
        },
        {
            icon: 'system-setup',
            navigateLink: 'system-setup',
            translationKey: 'core.left-side-bar-back.system-setup',
            subRouteItems: [],
            upperRoute: false
        }
    ]
}

