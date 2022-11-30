import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { CustomerServiceComponent } from './components/customer-service/customer-service.component';


const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: CustomerServiceComponent,
  }
];

@NgModule({
  declarations: [
    CustomerServiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CustomerServiceModule { }
