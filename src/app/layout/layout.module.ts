import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@root/shared/shared.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { LayoutComponent } from './components/layout/layout.component';
import { BackLeftSideBarComponent } from './components/left-side-bar/components/back-left-side-bar/back-left-side-bar.component';
import { LeftSideBarComponent } from './components/left-side-bar/components/left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from './components/right-side-bar/components/right-side-bar/right-side-bar.component';
import { ToolbarModule } from './components/toolbar/toolbar.module';
import { FrontLeftSideBarModule } from './components/left-side-bar/components/front-left-side-bar/front-left-side-bar.module';
import { NavigationItemComponent } from './components/left-side-bar/components/navigation-item/navigation-item.component';

@NgModule({
  declarations: [
    LayoutComponent,
    LeftSideBarComponent,
    RightSideBarComponent,
    BackLeftSideBarComponent,
    BreadcrumbsComponent,
    NavigationItemComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule,
    FrontLeftSideBarModule,
    HttpClientModule,
    MatIconModule,
    MatTreeModule,
    MatSidenavModule,
    MatSelectModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ToolbarModule,
    MatMenuModule
  ],
  providers: [],
})
export class LayoutModule { }
