import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesTemplatesManagementComponent } from './components/entities-templates-management/entities-templates-management.component';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from '@root/shared/shared.module';


const routes: Route[] = [
  {
    path: '',
    component: EntitiesTemplatesManagementComponent
  }
];

@NgModule({
  declarations: [
    EntitiesTemplatesManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class EntitiesTemplatesManagementModule { }
