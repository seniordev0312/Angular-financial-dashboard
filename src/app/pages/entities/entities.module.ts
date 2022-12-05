import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: ApplicationRoutes.Empty,
    redirectTo: ApplicationRoutes.EntitiesManagement,
    pathMatch: 'full'
  },
  {
    path: ApplicationRoutes.EntitiesTemplates,
    loadChildren: () => import('@root/pages/entities/entities-templates-management/entities-templates-management.module').then((m) =>
      m.EntitiesTemplatesManagementModule)
  },
  {
    path: ApplicationRoutes.EntitiesManagement,
    loadChildren: () => import('@root/pages/entities/entities-management/entities-management.module').then((m) =>
      m.EntitiesManagementModule)
  },
  {
    path: ApplicationRoutes.EntitiesRelationshipTypesManagement,
    loadChildren: () => import('@root/pages/entities/entities-relationship-types/entities-relationship-types.module').then((m) =>
      m.EntitiesRelationshipTypesModule)
  },
  {
    path: ApplicationRoutes.EntitiesKYCDocumentTypesManagement,
    loadChildren: () => import('@root/pages/entities/entities-kyc-document-types/entities-kyc-document-types.module').then((m) =>
      m.EntitiesKycDocumentTypesModule)
  },
  {
    path: ApplicationRoutes.EntitiesSourcesManagement,
    loadChildren: () => import('@root/pages/entities/entities-sources-management/entities-sources-management.module').then((m) =>
      m.EntitiesSourcesManagementModule)
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class EntitiesModule { }
