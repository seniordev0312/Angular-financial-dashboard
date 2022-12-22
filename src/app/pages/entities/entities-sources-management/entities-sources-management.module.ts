import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesSourcesManagementComponent } from './components/entities-sources-management/entities-sources-management.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';
import { AddEntitySourceComponent } from './components/add-entity-source/add-entity-source.component';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: EntitiesSourcesManagementComponent,
    data: {
      permission: Permission.CanAccessEntitySources
    },
    canActivate: [
      SecurityGuard
    ]
  },
  {
    path: ApplicationRoutes.Add,
    component: AddEntitySourceComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanAddEntitySources
    },
    canActivate: [
      SecurityGuard
    ]
  },
  {
    path: `${ApplicationRoutes.Add}/:id`,
    component: AddEntitySourceComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanEditEntitySources
    },
    canActivate: [
      SecurityGuard
    ]
  }
];

@NgModule({
  declarations: [
    EntitiesSourcesManagementComponent,
    AddEntitySourceComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes)
  ]
})
export class EntitiesSourcesManagementModule { }
