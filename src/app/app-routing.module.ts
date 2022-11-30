import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/components/layout/layout.component';
import { EntitiesControlModule } from './pages/entities-control/entities-control.module';
import { EntitiesManagementModule } from './pages/entities-management/entities-management.module';

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
      }
    ]
  },
];

@NgModule({
  imports: [
    EntitiesManagementModule,
    EntitiesControlModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
