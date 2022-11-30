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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTreeModule } from '@angular/material/tree';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@root/shared/shared.module';

import { ContentHeaderComponent } from './components/content-header/content-header.component';
import { DropdownComponent } from './components/header/component/dropdown/dropdown.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import {
  BackLeftSideBarComponent,
} from './components/left-side-bar/components/back-left-side-bar/back-left-side-bar.component';
import {
  ChatCardComponent,
} from './components/left-side-bar/components/front-left-side-bar/components/direct/components/chat-card/chat-card.component';
import {
  MessageCardComponent,
} from './components/left-side-bar/components/front-left-side-bar/components/direct/components/chat-card/components/message-card/message-card.component';
import {
  ContactCardComponent,
} from './components/left-side-bar/components/front-left-side-bar/components/direct/components/contact-card/contact-card.component';
import {
  DirectComponent,
} from './components/left-side-bar/components/front-left-side-bar/components/direct/components/direct/direct.component';
import { GroupComponent } from './components/left-side-bar/components/front-left-side-bar/components/group/group.component';
import {
  FrontLeftSideBarComponent,
} from './components/left-side-bar/components/front-left-side-bar/front-left-side-bar.component';
import { LeftSideBarComponent } from './components/left-side-bar/components/left-side-bar/left-side-bar.component';
import { RightSideBarComponent } from './components/right-side-bar/components/right-side-bar/right-side-bar.component';


@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    LeftSideBarComponent,
    RightSideBarComponent,
    FrontLeftSideBarComponent,
    BackLeftSideBarComponent,
    DropdownComponent,
    DirectComponent,
    GroupComponent,
    ContactCardComponent,
    ChatCardComponent,
    MessageCardComponent,
    ContentHeaderComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatTreeModule,
    MatSidenavModule,
    MatSelectModule,
    MatTreeModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule
  ],
  providers: [],
})
export class LayoutModule { }
