import { ApplicationRoutes } from "@root/shared/settings/common.settings";
import { MainRoute } from "../models/mainRoute";


export const mainRoutesList: MainRoute = {
    upper: [
        {
            icon: 'dashboard',
            navigateLink: ApplicationRoutes.Dashboard,
            translationKey: 'core.left-side-bar-back.dashboard',
            subRouteItems: [],
            upperRoute: true,
            sidenavLink: ApplicationRoutes.Email
        },
        {
            icon: 'customer-service',
            navigateLink: undefined,
            translationKey: 'core.left-side-bar-back.customer-service',
            subRouteItems: [
                {
                    navigateLink: ApplicationRoutes.CustomerService,
                    translationKey: 'core.left-side-bar-back.customer-service'
                },
                {
                    navigateLink: ApplicationRoutes.PolicyRenewals,
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
                    navigateLink: ApplicationRoutes.GeneralInsuranceUnderwriting,
                    translationKey: 'core.left-side-bar-back.general-insurance-underwriting'
                },
                {
                    navigateLink: ApplicationRoutes.MotorInsuranceUnderwriting,
                    translationKey: 'core.left-side-bar-back.motor-insurance-underwriting'
                },
                {
                    navigateLink: ApplicationRoutes.MedicalInsuranceUnderwriting,
                    translationKey: 'core.left-side-bar-back.medical-insurance-underwriting'
                },
                {
                    navigateLink: ApplicationRoutes.LifeInsuranceUnderwriting,
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
                    navigateLink: ApplicationRoutes.Cashier,
                    translationKey: 'core.left-side-bar-back.cashier',
                },
                {
                    navigateLink: ApplicationRoutes.GeneralAccounting,
                    translationKey: 'core.left-side-bar-back.general-accounting',
                },
                {
                    navigateLink: ApplicationRoutes.AccountsPayable,
                    translationKey: 'core.left-side-bar-back.accounts-payable',
                },
                {
                    navigateLink: ApplicationRoutes.FinanceAndReporting,
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
                    navigateLink: ApplicationRoutes.Payroll,
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
                    navigateLink: ApplicationRoutes.CorrespondenceManagement,
                    translationKey: 'core.left-side-bar-back.correspondence-management',
                }
            ],
            upperRoute: true
        }
    ],
    lower: [
        {
            icon: 'activityLog',
            navigateLink: ApplicationRoutes.ActivityLog,
            translationKey: 'core.left-side-bar-back.activity-log',
            subRouteItems: [],
            upperRoute: false
        },
        {
            icon: 'product-management',
            navigateLink: ApplicationRoutes.ProductManagement,
            translationKey: 'core.left-side-bar-back.product-management',
            subRouteItems: [],
            upperRoute: false
        },
        {
            icon: 'treaty',
            navigateLink: ApplicationRoutes.TreatyManagement,
            translationKey: 'core.left-side-bar-back.treaty-management',
            subRouteItems: [],
            upperRoute: false
        },
        {
            icon: 'entity-management',
            navigateLink: ApplicationRoutes.Entities,
            translationKey: 'core.left-side-bar-back.entity-management',
            subRouteItems: [],
            upperRoute: false
        },
        {
            icon: 'settings',
            navigateLink: ApplicationRoutes.Settings,
            translationKey: 'core.left-side-bar-back.settings',
            subRouteItems: [],
            upperRoute: false
        },
        {
            icon: 'system-setup',
            navigateLink: ApplicationRoutes.SystemSetup,
            translationKey: 'core.left-side-bar-back.system-setup',
            subRouteItems: [],
            upperRoute: false
        }
    ]
}

