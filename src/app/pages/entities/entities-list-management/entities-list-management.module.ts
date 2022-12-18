import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesListManagementComponent } from './components/entities-list-management/entities-list-management.component';
import { AddNewEntityComponent } from './components/add-new-entity/add-new-entity.component';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '@root/shared/shared.module';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { EntityCardComponent } from './components/entity-card/entity-card.component';
import { SectionCardComponent } from './components/section-card/section-card.component';
import { ElementChipComponent } from './components/element-chip/element-chip.component';
import { AddSectionComponent } from './components/add-section/add-section.component';
import { AddElementComponent } from './components/add-element/add-element.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { SecurityGuard } from '@root/shared/guards/security.guard';
import { Permission } from '@root/shared/models/enums/permissions.enum';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: EntitiesListManagementComponent,
    data: {
      permission: Permission.CanAccessEntityManagement
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
  {
    path: ApplicationRoutes.Add,
    component: AddNewEntityComponent,
    data: {
      permission: Permission.CanAddEntityManagement
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
  {
    path: `:code`,
    component: AddNewEntityComponent,
    data: {
      permission: Permission.CanEditEntityManagement
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
  {
    path: `${ApplicationRoutes.EntitiesSection}/${ApplicationRoutes.Add}`,
    component: AddSectionComponent,
    outlet: 'sidenav',
    canActivate: [
      AutoLoginAllRoutesGuard,
    ]
  },
  {
    path: `${ApplicationRoutes.EntitiesSection}/${ApplicationRoutes.Edit}`,
    component: AddSectionComponent,
    outlet: 'sidenav',
    canActivate: [
      AutoLoginAllRoutesGuard,
    ]
  },
  {
    path: `${ApplicationRoutes.EntitiesElement}/${ApplicationRoutes.Add}`,
    component: AddElementComponent,
    outlet: 'sidenav',
    canActivate: [
      AutoLoginAllRoutesGuard,
    ]
  },
  {
    path: `${ApplicationRoutes.EntitiesElement}/${ApplicationRoutes.Edit}`,
    component: AddElementComponent,
    outlet: 'sidenav',
    canActivate: [
      AutoLoginAllRoutesGuard,
    ]
  }
];

@NgModule({
  declarations: [
    EntitiesListManagementComponent,
    AddNewEntityComponent,
    EntityCardComponent,
    SectionCardComponent,
    ElementChipComponent,
    AddSectionComponent,
    AddElementComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrganizationChartModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes)
  ]
})
export class EntitiesListManagementModule { }
