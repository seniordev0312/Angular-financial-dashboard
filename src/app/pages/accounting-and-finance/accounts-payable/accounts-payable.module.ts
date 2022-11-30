import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsPayableComponent } from './components/accounts-payable/accounts-payable.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: AccountsPayableComponent,
  }
];


@NgModule({
  declarations: [
    AccountsPayableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountsPayableModule { }
