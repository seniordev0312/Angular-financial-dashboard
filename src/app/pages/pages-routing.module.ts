import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';

const routes: Routes = [
  {
    path: ApplicationRoutes.Empty,
    redirectTo: ApplicationRoutes.Dashboard,
    pathMatch: 'full',
  },
  {
    path: ApplicationRoutes.Dashboard,
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.SystemSetup,
    loadChildren: () => import('./system-setup/system-setup.module').then((m) => m.SystemSetupModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.CustomerService,
    loadChildren: () => import('./customer-service/customer-service/customer-service.module').then((m) => m.CustomerServiceModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.InsuranceRenewals,
    loadChildren: () => import('./customer-service/insurance-renewals/insurance-renewals.module').then((m) => m.InsuranceRenewalsModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.ProductManagement,
    loadChildren: () => import('./management/product-management/product-management.module').then((m) => m.ProductManagementModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.TreatyManagement,
    loadChildren: () => import('./management/treaty-management/treaty-management.module').then((m) => m.TreatyManagementModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.Settings,
    loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.GeneralInsuranceUnderwriting,
    loadChildren: () => import('./Insurance-underwriting/general-insurance-underwriting/general-insurance-underwriting.module').then((m) => m.GeneralInsuranceUnderwritingModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.LifeInsuranceUnderwriting,
    loadChildren: () => import('./Insurance-underwriting/life-insurance-underwriting/life-insurance-underwriting.module').then((m) => m.LifeInsuranceUnderwritingModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.MedicalInsuranceUnderwriting,
    loadChildren: () => import('./Insurance-underwriting/medical-insurance-underwriting/medical-insurance-underwriting.module').then((m) => m.MedicalInsuranceUnderwritingModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.MotorInsuranceUnderwriting,
    loadChildren: () => import('./Insurance-underwriting/motor-insurance-underwriting/motor-insurance-underwriting.module')
      .then((m) => m.MotorInsuranceUnderwritingModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.Payroll,
    loadChildren: () => import('./human-resources/payroll/payroll.module').then((m) => m.PayrollModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.AccountsPayable,
    loadChildren: () => import('./accounting-and-finance/accounts-payable/accounts-payable.module').
      then((m) => m.AccountsPayableModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.Cashier,
    loadChildren: () => import('./accounting-and-finance/cashier/cashier.module').then((m) => m.CashierModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.FinanceAndReporting,
    loadChildren: () => import('./accounting-and-finance/finance-and-reporting/finance-and-reporting.module').
      then((m) => m.FinanceAndReportingModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.GeneralAccounting,
    loadChildren: () => import('./accounting-and-finance/General-accounting/general-accounting/general-accounting.module').then((m) => m.GeneralAccountingModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.ActivityLog,
    loadChildren: () => import('./activity-log/activity-log/activity-log.module').then((m) => m.ActivityLogModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.CorrespondenceManagement,
    loadChildren: () => import('./correspondence/correspondence-management/correspondence-management.module')
      .then((m) => m.CorrespondenceManagementModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.Entities,
    loadChildren: () => import('@root/pages/entities/entities.module').then((m) => m.EntitiesModule),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.PolicyRenewals,
    loadChildren: () =>
      import('./customer-service/policy-renewals/policy-renewals.module').then(
        (m) => m.PolicyRenewalsModule
      ),
    canLoad: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.Reports,
    loadChildren: () =>
      import('./reports/reports.module').then(
        (m) => m.ReportsModule
      ),
    canLoad: [AutoLoginAllRoutesGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
