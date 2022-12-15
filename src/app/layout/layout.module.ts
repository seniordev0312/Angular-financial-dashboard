import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@root/shared/shared.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { LayoutComponent } from './components/layout/layout.component';
import { BackLeftSideBarComponent } from './components/left-side-bar/components/back-left-side-bar/back-left-side-bar.component';
import { ChatCardComponent } from './components/left-side-bar/components/front-left-side-bar/components/direct/components/chat-card/chat-card.component';
import { MessageCardComponent } from './components/left-side-bar/components/front-left-side-bar/components/direct/components/chat-card/components/message-card/message-card.component';
import { ContactCardComponent } from './components/left-side-bar/components/front-left-side-bar/components/direct/components/contact-card/contact-card.component';
import { DirectComponent } from './components/left-side-bar/components/front-left-side-bar/components/direct/components/direct/direct.component';
import { GroupComponent } from './components/left-side-bar/components/front-left-side-bar/components/group/group.component';
import { FrontLeftSideBarComponent } from './components/left-side-bar/components/front-left-side-bar/front-left-side-bar.component';
import { LeftSideBarComponent } from './components/left-side-bar/components/left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from './components/right-side-bar/components/right-side-bar/right-side-bar.component';
import { ToolbarModule } from './components/toolbar/toolbar.module';

@NgModule({
  declarations: [
    LayoutComponent,
    LeftSideBarComponent,
    RightSideBarComponent,
    FrontLeftSideBarComponent,
    BackLeftSideBarComponent,
    DirectComponent,
    GroupComponent,
    ContactCardComponent,
    ChatCardComponent,
    MessageCardComponent,
    BreadcrumbsComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatIconModule,
    MatTreeModule,
    MatSidenavModule,
    MatSelectModule,
    MatTreeModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    ToolbarModule,
    MatMenuModule
  ],
  providers: [],
})
export class LayoutModule { }
