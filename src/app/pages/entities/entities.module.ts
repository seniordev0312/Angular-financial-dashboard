import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { RouterModule, Routes } from '@angular/router';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { Permission } from '@root/shared/models/enums/permissions.enum';

const routes: Routes = [
  {
    path: ApplicationRoutes.Empty,
    redirectTo: ApplicationRoutes.EntitiesManagement,
    pathMatch: 'full'
  },
  {
    path: ApplicationRoutes.EntitiesTemplates,
    loadChildren: () => import('@root/pages/entities/entities-templates-management/entities-templates-management.module').then((m) =>
      m.EntitiesTemplatesManagementModule),
    data: {
      permission: Permission.CanAccessEntityTemplate
    },
    canLoad: [
      AutoLoginAllRoutesGuard,
    ]
  },
  {
    path: ApplicationRoutes.EntitiesManagement,
    loadChildren: () => import('@root/pages/entities/entities-management/entities-management.module').then((m) =>
      m.EntitiesManagementModule),
    data: {
      permission: Permission.CanAccessEntityManagement
    },
    canLoad: [
      AutoLoginAllRoutesGuard,
    ]
  },
  {
    path: ApplicationRoutes.EntitiesRelationshipTypesManagement,
    loadChildren: () => import('@root/pages/entities/entities-relationship-types/entities-relationship-types.module').then((m) =>
      m.EntitiesRelationshipTypesModule),
    data: {
      permission: Permission.CanAccessEntityRelationshipType
    },
    canLoad: [
      AutoLoginAllRoutesGuard,
    ]
  },
  {
    path: ApplicationRoutes.EntitiesKYCDocumentTypesManagement,
    loadChildren: () => import('@root/pages/entities/entities-kyc-document-types/entities-kyc-document-types.module').then((m) =>
      m.EntitiesKycDocumentTypesModule),
    data: {
      permission: Permission.CanAccessEntityKYCDocument
    },
    canLoad: [
      AutoLoginAllRoutesGuard,
    ]
  },
  {
    path: ApplicationRoutes.EntitiesSourcesManagement,
    loadChildren: () => import('@root/pages/entities/entities-sources-management/entities-sources-management.module').then((m) =>
      m.EntitiesSourcesManagementModule),
    data: {
      permission: Permission.CanAccessEntitySources
    },
    canLoad: [
      AutoLoginAllRoutesGuard,
    ]
  },
  {
    path: ApplicationRoutes.EntitiesMappingManagement,
    loadChildren: () => import('@root/pages/entities/entities-mapping-management/entities-mapping-management.module').then((m) =>
      m.EntitiesMappingManagementModule),
    data: {
      permission: Permission.CanAccessEntityMapping
    },
    canLoad: [
      AutoLoginAllRoutesGuard,
    ]
  },
  {
    path: ApplicationRoutes.EntitiesListManagement,
    loadChildren: () => import('@root/pages/entities/entities-list-management/entities-list-management.module').then((m) =>
      m.EntitiesListManagementModule),
    data: {
      permission: Permission.CanAccessEntityManagement
    },
    canLoad: [
      AutoLoginAllRoutesGuard,
    ]
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
