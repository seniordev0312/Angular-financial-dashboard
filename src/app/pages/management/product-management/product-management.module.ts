import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from './components/product-management/product-management.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: ProductManagementComponent,
    data: {
      permission: Permission.CanAccessProductManagement
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  }
];

@NgModule({
  declarations: [
    ProductManagementComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class ProductManagementModule { }
