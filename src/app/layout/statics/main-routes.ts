import { Permission } from '@root/shared/models/enums/permissions.enum';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { MainNavigation } from '../models/main-navigation';

export const navigationList: MainNavigation = {
  upper: [
    {
      icon: 'dashboard',
      type: 'link',
      navigateLink: ApplicationRoutes.Dashboard,
      translationKey: 'core.left-side-bar-back.dashboard',
      upperRoute: true,
      sidenavLink: ApplicationRoutes.Email,
      permission: Permission.CanAccessEmail,
    },
    {
      icon: 'customer-service',
      type: 'dropdown',
      translationKey: 'core.left-side-bar-back.customer-service',
      subRouteItems: [
        {
          type: 'link',
          navigateLink: ApplicationRoutes.CustomerService,
          translationKey: 'core.left-side-bar-back.customer-service',
          permission: Permission.CanAccessCustomerService,
        },
        {
          type: 'link',
          navigateLink: ApplicationRoutes.PolicyRenewals,
          translationKey: 'core.left-side-bar-back.insurance-renewals',
          permission: Permission.CanAccessInsuranceRenewals,
        },
      ],
      upperRoute: true,
    },
    {
      icon: 'insurance-underwriting',
      translationKey: 'core.left-side-bar-back.insurance-underwriting',
      subRouteItems: [
        {
          type: 'link',
          navigateLink: ApplicationRoutes.GeneralInsuranceUnderwriting,
          translationKey:
            'core.left-side-bar-back.general-insurance-underwriting',
          permission: Permission.CanAccessGeneralInsuranceUnderwriting,
        },
        {
          type: 'link',
          navigateLink: ApplicationRoutes.MotorInsuranceUnderwriting,
          translationKey:
            'core.left-side-bar-back.motor-insurance-underwriting',
          permission: Permission.CanAccessMotorInsuranceUnderwriting,
        },
        {
          type: 'link',
          navigateLink: ApplicationRoutes.MedicalInsuranceUnderwriting,
          translationKey:
            'core.left-side-bar-back.medical-insurance-underwriting',
          permission: Permission.CanAccessMedicalInsuranceUnderwriting,
        },
        {
          type: 'link',
          navigateLink: ApplicationRoutes.LifeInsuranceUnderwriting,
          translationKey: 'core.left-side-bar-back.life-insurance-underwriting',
          permission: Permission.CanAccessLifeInsuranceUnderwriting,
        },
      ],
      upperRoute: true,
      type: 'dropdown',
    },
    {
      icon: 'accounting-and-finance',
      translationKey: 'core.left-side-bar-back.accounting-and-finance',
      subRouteItems: [
        {
          type: 'link',
          navigateLink: ApplicationRoutes.Cashier,
          translationKey: 'core.left-side-bar-back.cashier',
          permission: Permission.CanAccessCashier,
        },
        {
          type: 'link',
          navigateLink: ApplicationRoutes.GeneralAccounting,
          translationKey: 'core.left-side-bar-back.general-accounting',
          permission: Permission.CanAccessGeneralAccounting,
        },
        {
          type: 'link',
          navigateLink: ApplicationRoutes.AccountsPayable,
          translationKey: 'core.left-side-bar-back.accounts-payable',
          permission: Permission.CanAccessAccountsPayable,
        },
        {
          type: 'link',
          navigateLink: ApplicationRoutes.AccountsReceivable,
          translationKey: 'core.left-side-bar-back.accounts-receivable',
          permission: Permission.CanAccessAccountsReceivable,
        },
        {
          type: 'link',
          navigateLink: ApplicationRoutes.FinanceAndReporting,
          translationKey: 'core.left-side-bar-back.finance-and-reporting',
          permission: Permission.CanAccessFinanceAndReporting,
        },
      ],
      upperRoute: true,
      type: 'dropdown',
    },
    {
      icon: 'human-resources',
      translationKey: 'core.left-side-bar-back.human-resources',
      subRouteItems: [
        {
          type: 'link',
          navigateLink: ApplicationRoutes.Payroll,
          translationKey: 'core.left-side-bar-back.payroll',
          permission: Permission.CanAccessPayroll,
        },
      ],
      upperRoute: true,
      type: 'dropdown',
    },
    {
      icon: 'correspondence',
      translationKey: 'core.left-side-bar-back.correspondence',
      subRouteItems: [
        {
          type: 'link',
          navigateLink: ApplicationRoutes.CorrespondenceManagement,
          translationKey: 'core.left-side-bar-back.correspondence-management',
          permission: Permission.CanAccessCorrespondenceManagement,
        },
      ],
      upperRoute: true,
      type: 'dropdown',
    },
  ],
  lower: [
    {
      icon: 'activityLog',
      navigateLink: ApplicationRoutes.ActivityLog,
      translationKey: 'core.left-side-bar-back.activity-log',
      subRouteItems: [],
      upperRoute: false,
      permission: Permission.CanAccessActivityLog,
      type: 'link',
    },
    {
      icon: 'product-management',
      navigateLink: ApplicationRoutes.ProductManagement,
      translationKey: 'core.left-side-bar-back.product-management',
      subRouteItems: [],
      upperRoute: false,
      permission: Permission.CanAccessProductManagement,
      type: 'link',
    },
    {
      icon: 'treaty',
      navigateLink: ApplicationRoutes.TreatyManagement,
      translationKey: 'core.left-side-bar-back.treaty-management',
      subRouteItems: [],
      upperRoute: false,
      permission: Permission.CanAccessTreatyManagement,
      type: 'link',
    },
    {
      icon: 'entity-management',
      navigateLink: ApplicationRoutes.Entities,
      translationKey: 'core.left-side-bar-back.entity-management',
      subRouteItems: [],
      upperRoute: false,
      permission: Permission.CanAccessEntityManagement,
      type: 'link',
    },
    {
      icon: 'report-viewer',
      navigateLink: ApplicationRoutes.Reports,
      translationKey: 'core.left-side-bar-back.report-viewer',
      subRouteItems: [],
      upperRoute: false,
      permission: Permission.CanAccessChartOfAccounts,
      type: 'link',
    },
    {
      icon: 'report-viewer',
      navigateLink: `${ApplicationRoutes.Reports}/${ApplicationRoutes.ReportsDesigner}`,
      translationKey: 'core.left-side-bar-back.report-designer',
      subRouteItems: [],
      upperRoute: false,
      permission: Permission.CanAccessChartOfAccounts,
      type: 'link',
    },
    {
      icon: 'settings',
      navigateLink: ApplicationRoutes.Settings,
      translationKey: 'core.left-side-bar-back.settings',
      subRouteItems: [],
      upperRoute: false,
      permission: Permission.CanAccessSettings,
      type: 'link',
    },
    {
      icon: 'system-setup',
      navigateLink: ApplicationRoutes.SystemSetup,
      translationKey: 'core.left-side-bar-back.system-setup',
      subRouteItems: [],
      upperRoute: false,
      permission: Permission.CanAccessSystemSetup,
      type: 'link',
    },
  ],
};
