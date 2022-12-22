import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesTemplatesManagementComponent } from './components/entities-templates-management/entities-templates-management.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '@root/shared/shared.module';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AddEntityTemplateComponent } from './components/add-entity-template/add-entity-template.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';


const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: EntitiesTemplatesManagementComponent,
    data: {
      permission: Permission.CanAccessEntityTemplate
    },
    canActivate: [
      SecurityGuard
    ]
  },
  {
    path: ApplicationRoutes.Add,
    component: AddEntityTemplateComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanAddEntityTemplate
    },
    canActivate: [
      SecurityGuard
    ]
  },
  {
    path: `${ApplicationRoutes.Add}/:id`,
    component: AddEntityTemplateComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanEditEntityTemplate
    },
    canActivate: [
      SecurityGuard
    ]
  }
];

@NgModule({
  declarations: [
    EntitiesTemplatesManagementComponent,
    AddEntityTemplateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ]
})
export class EntitiesTemplatesManagementModule { }
