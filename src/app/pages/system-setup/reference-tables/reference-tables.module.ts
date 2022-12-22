import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferenceTablesComponent } from './components/reference-tables/reference-tables.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';
import { SharedSystemSetupModule } from '../shared-system-setup/shared-system-setup.module';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { SecurityGuard } from '@root/shared/guards/security.guard';
import { AddReferenceTablesComponent } from './components/add-reference-tables/add-reference-tables.component';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: ReferenceTablesComponent,
    data: {
      permission: Permission.CanAccessReferenceTables
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
  {
    path: ApplicationRoutes.Add,
    component: AddReferenceTablesComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanAccessAddReferenceTables
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
]

@NgModule({
  declarations: [ReferenceTablesComponent, AddReferenceTablesComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedSystemSetupModule,
    RouterModule.forChild(routes)
  ]
})
export class ReferenceTablesModule { }
