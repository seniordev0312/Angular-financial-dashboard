import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesKycDocumentTypesManagementComponent } from './components/entities-kyc-document-types-management/entities-kyc-document-types-management.component';
import { SharedModule } from '@root/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AddDocumentTypeComponent } from './components/add-document-type/add-document-type.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: EntitiesKycDocumentTypesManagementComponent,
    canActivate: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.Add,
    component: AddDocumentTypeComponent,
    outlet: 'sidenav',
    canActivate: [AutoLoginAllRoutesGuard]
  },
  {
    path: `${ApplicationRoutes.Add}/:id`,
    component: AddDocumentTypeComponent,
    outlet: 'sidenav',
    canActivate: [AutoLoginAllRoutesGuard]
  },
];

@NgModule({
  declarations: [
    EntitiesKycDocumentTypesManagementComponent,
    AddDocumentTypeComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes)
  ]
})
export class EntitiesKycDocumentTypesModule { }
