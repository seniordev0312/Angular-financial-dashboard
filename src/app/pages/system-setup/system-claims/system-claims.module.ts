import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemClaimsComponent } from './components/system-claims/system-claims.component';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';
import { SharedSystemSetupModule } from '../shared-system-setup/shared-system-setup.module';
import { SystemClaimsService } from './services/system-claims.service';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: SystemClaimsComponent,
    data: {
      permission: Permission.CanAccessSystemClaims
    },
    canActivate: [
      SecurityGuard
    ]
  }
];

@NgModule({
  declarations: [SystemClaimsComponent],
  imports: [
    CommonModule,
    SharedModule,
    SharedSystemSetupModule,
    RouterModule.forChild(routes)
  ],
  providers: [SystemClaimsService]
})
export class SystemClaimsModule { }
