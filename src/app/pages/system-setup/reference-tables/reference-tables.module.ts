import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferenceTablesComponent } from './components/reference-tables.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';


const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: ReferenceTablesComponent
  }
]
@NgModule({
  declarations: [
    ReferenceTablesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes)
  ]
})
export class ReferenceTablesModule { }
