import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '@root/layout/components/layout/layout.component';
import { EntitiesControlModule } from '@root/pages/entities/entities-control/entities-control.module';
import { EntitiesViewerModule } from '@root/pages/entities/entities-viewer/entities-viewer.module';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/pages.module').then(
            (m) => m.PagesModule
          ),
        canLoad: [AutoLoginAllRoutesGuard]
      }
    ],
    canActivate: [AutoLoginAllRoutesGuard]
  },
];

@NgModule({
  imports: [
    EntitiesViewerModule,
    EntitiesControlModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
