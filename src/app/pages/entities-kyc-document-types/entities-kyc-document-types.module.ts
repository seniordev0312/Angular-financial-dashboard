import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesKycDocumentTypesManagementComponent } from './components/entities-kyc-document-types-management/entities-kyc-document-types-management.component';
import { SharedModule } from '@root/shared/shared.module';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: EntitiesKycDocumentTypesManagementComponent
  },
];

@NgModule({
  declarations: [
    EntitiesKycDocumentTypesManagementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class EntitiesKycDocumentTypesModule { }
