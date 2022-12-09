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

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: EntitiesListManagementComponent
  },
  {
    path: ApplicationRoutes.Add,
    component: AddNewEntityComponent,
  },
  {
    path: `${ApplicationRoutes.Add}/:id`,
    component: AddNewEntityComponent,
  },
  {
    path: ApplicationRoutes.EntitiesSection,
    component: AddSectionComponent,
    outlet: 'sidenav',
  },
  {
    path: `${ApplicationRoutes.EntitiesSection}/:id`,
    component: AddSectionComponent,
    outlet: 'sidenav',
  },
  {
    path: ApplicationRoutes.EntitiesElement,
    component: AddElementComponent,
    outlet: 'sidenav',
  },
  {
    path: `${ApplicationRoutes.EntitiesElement}/:id`,
    component: AddElementComponent,
    outlet: 'sidenav',
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
    AddElementComponent
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