import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';

import { SharedSystemSetupModule } from '../shared-system-setup/shared-system-setup.module';
import { CompanyStructureComponent } from './components/company-structure/company-structure.component';
import { AddGroupComponent } from './components/add-group/add-group.component';
import { AddBranchComponent } from './components/add-branch/add-branch.component';
import { AddDepartmentComponent } from './components/add-department/add-department.component';
import { OrganizationChartModule } from 'primeng/organizationchart';
import { CompanyCardComponent } from './components/company-card/company-card.component';
import { GroupCardComponent } from './components/group-card/group-card.component';
import { BranchCardComponent } from './components/branch-card/branch-card.component';
import { DepartmentCardComponent } from './components/department-card/department-card.component';
import { GroupChipComponent } from './components/group-chip/group-chip.component';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: CompanyStructureComponent
  },
  {
    path: ApplicationRoutes.AddGroup,
    component: AddGroupComponent,
    outlet: 'sidenav',
  },
  {
    path: `${ApplicationRoutes.AddGroup}/:id`,
    component: AddGroupComponent,
    outlet: 'sidenav',
  },
  {
    path: ApplicationRoutes.AddDepartment,
    component: AddDepartmentComponent,
    outlet: 'sidenav',
  },
  {
    path: `${ApplicationRoutes.AddDepartment}/:id`,
    component: AddDepartmentComponent,
    outlet: 'sidenav',
  },
  {
    path: ApplicationRoutes.AddBranch,
    component: AddBranchComponent,
    outlet: 'sidenav',
  },
  {
    path: `${ApplicationRoutes.AddBranch}/:id/:name`,
    component: AddBranchComponent,
    outlet: 'sidenav',
  },
]

@NgModule({
  declarations: [
    CompanyStructureComponent,
    AddGroupComponent,
    AddBranchComponent,
    AddDepartmentComponent,
    CompanyCardComponent,
    GroupCardComponent,
    BranchCardComponent,
    DepartmentCardComponent,
    GroupChipComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    OrganizationChartModule,
    SharedSystemSetupModule,
    RouterModule.forChild(routes)
  ]
})
export class CompanyStructureModule { }
