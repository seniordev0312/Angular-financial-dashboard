import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesKycDocumentTypesManagementComponent } from './components/entities-kyc-document-types-management/entities-kyc-document-types-management.component';
import { SharedModule } from '@root/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AddDocumentTypeComponent } from './components/add-document-type/add-document-type.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: EntitiesKycDocumentTypesManagementComponent
  },
  {
    path: ApplicationRoutes.AddKYCDocumentType,
    component: AddDocumentTypeComponent,
    outlet: 'sidenav',
  },
  {
    path: `${ApplicationRoutes.AddKYCDocumentType}/:id`,
    component: AddDocumentTypeComponent,
    outlet: 'sidenav',
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
