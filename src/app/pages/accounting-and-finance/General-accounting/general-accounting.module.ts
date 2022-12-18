import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralAccountingComponent } from './components/general-accounting/general-accounting.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: GeneralAccountingComponent,
    data: {
      permission: Permission.CanAccessGeneralAccounting
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]  }
];

@NgModule({
  declarations: [
    GeneralAccountingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GeneralAccountingModule { }
