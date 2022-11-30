import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneralAccountingComponent } from './components/general-accounting/general-accounting.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: GeneralAccountingComponent,
  }
];

@NgModule({
  declarations: [
    GeneralAccountingComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GeneralAccountingModule { }
