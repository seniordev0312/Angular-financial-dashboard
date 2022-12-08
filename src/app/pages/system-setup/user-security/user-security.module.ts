import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSecurityComponent } from './components/user-security.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Route, RouterModule } from '@angular/router';
import { SharedModule } from 'primeng/api';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: UserSecurityComponent
  }
]
@NgModule({
  declarations: [
    UserSecurityComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatSlideToggleModule,
    RouterModule.forChild(routes)
  ]
})
export class UserSecurityModule { }
