
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

const routes: Routes = [
    {
        path: ApplicationRoutes.Empty,
        redirectTo: ApplicationRoutes.Dashboard,
        data: {
            breadcrumb: undefined
        },
        pathMatch: 'full'
    },
    {
        path: ApplicationRoutes.Dashboard,
        data: {
            breadcrumb: undefined
        },
        loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
    },
    {
        path: ApplicationRoutes.SystemSetup,
        data: {
            breadcrumb: ApplicationRoutes.SystemSetup
        },
        loadChildren: () => import('./system-setup/system-setup.module').then((m) => m.SystemSetupModule)
    },
    {
        path: ApplicationRoutes.CustomerService,
        data: {
            breadcrumb: ApplicationRoutes.CustomerService
        },
        loadChildren: () => import('./customer-service/customer-service/customer-service.module').then((m) => m.CustomerServiceModule)
    },
    {
        path: ApplicationRoutes.InsuranceRenewals,
        data: {
            breadcrumb: ApplicationRoutes.InsuranceRenewals
        },
        loadChildren: () => import('./customer-service/insurance-renewals/insurance-renewals.module').then((m) => m.InsuranceRenewalsModule)
    },
    {
        path: ApplicationRoutes.ProductManagement,
        data: {
            breadcrumb: ApplicationRoutes.ProductManagement
        },
        loadChildren: () => import('./management/product-management/product-management.module').then((m) => m.ProductManagementModule)
    },
    {
        path: ApplicationRoutes.TreatyManagement,
        data: {
            breadcrumb: ApplicationRoutes.TreatyManagement
        },
        loadChildren: () => import('./management/treaty-management/treaty-management.module').then((m) => m.TreatyManagementModule)
    },
    {
        path: ApplicationRoutes.Settings,
        data: {
            breadcrumb: ApplicationRoutes.Settings
        },
        loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule)
    },
    {
        path: ApplicationRoutes.GeneralInsuranceUnderwriting,
        data: {
            breadcrumb: ApplicationRoutes.GeneralInsuranceUnderwriting
        },
        loadChildren: () => import('./Insurance-underwriting/general-insurance-underwriting/general-insurance-underwriting.module').then((m) => m.GeneralInsuranceUnderwritingModule)

    },
    {
        path: ApplicationRoutes.LifeInsuranceUnderwriting,
        data: {
            breadcrumb: ApplicationRoutes.LifeInsuranceUnderwriting
        },
        loadChildren: () => import('./Insurance-underwriting/life-insurance-underwriting/life-insurance-underwriting.module').then((m) => m.LifeInsuranceUnderwritingModule)

    },
    {
        path: ApplicationRoutes.MedicalInsuranceUnderwriting,
        data: {
            breadcrumb: ApplicationRoutes.MedicalInsuranceUnderwriting
        },
        loadChildren: () => import('./Insurance-underwriting/medical-insurance-underwriting/medical-insurance-underwriting.module').then((m) => m.MedicalInsuranceUnderwritingModule)
    },
    {
        path: ApplicationRoutes.MotorInsuranceUnderwriting,
        data: {
            breadcrumb: ApplicationRoutes.MotorInsuranceUnderwriting
        },
        loadChildren: () => import('./Insurance-underwriting/motor-insurance-underwriting/motor-insurance-underwriting.module').then((m) => m.MotorInsuranceUnderwritingModule)
    },
    {
        path: ApplicationRoutes.Payroll,
        data: {
            breadcrumb: ApplicationRoutes.Payroll
        },
        loadChildren: () => import('./human-resources/payroll/payroll.module').then((m) => m.PayrollModule)
    },
    {
        path: ApplicationRoutes.AccountsPayable,
        data: {
            breadcrumb: ApplicationRoutes.AccountsPayable
        },
        loadChildren: () => import('./accounting-and-finance/accounts-payable/accounts-payable.module').then((m) => m.AccountsPayableModule)
    },
    {
        path: ApplicationRoutes.Cashier,
        data: {
            breadcrumb: ApplicationRoutes.Cashier
        },
        loadChildren: () => import('./accounting-and-finance/cashier/cashier.module').then((m) => m.CashierModule)
    },
    {
        path: ApplicationRoutes.FinanceAndReporting,
        data: {
            breadcrumb: ApplicationRoutes.FinanceAndReporting
        },
        loadChildren: () => import('./accounting-and-finance/finance-and-reporting/finance-and-reporting.module').then((m) => m.FinanceAndReportingModule)
    },
    {
        path: ApplicationRoutes.GeneralAccounting,
        data: {
            breadcrumb: ApplicationRoutes.GeneralAccounting
        },
        loadChildren: () => import('./accounting-and-finance/General-accounting/general-accounting.module').then((m) => m.GeneralAccountingModule)
    },
    {
        path: ApplicationRoutes.ActivityLog,
        data: {
            breadcrumb: ApplicationRoutes.ActivityLog
        },
        loadChildren: () => import('./activity-log/activity-log/activity-log.module').then((m) => m.ActivityLogModule)
    },
    {
        path: ApplicationRoutes.CorrespondenceManagement,
        data: {
            breadcrumb: ApplicationRoutes.CorrespondenceManagement
        },
        loadChildren: () => import('./correspondence/correspondence-management/correspondence-management.module').then((m) => m.CorrespondenceManagementModule)
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }