import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '@root/pages/dashboard/components/dashboard/dashboard.component';
import { Route, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AssignedTasksComponent } from '@root/pages/dashboard/components/assigned-tasks/assigned-tasks.component';
import { StickyNotesComponent } from '@root/pages/dashboard/components/sticky-notes/sticky-notes.component';
import { StickyNotesCardComponent } from '@root/pages/dashboard/components/sticky-notes-card/sticky-notes-card.component';
import { AssignedTasksItemComponent } from '@root/pages/dashboard/components/assigned-tasks-item/assigned-tasks-item.component';
import { SharedModule } from '@root/shared/shared.module';
import { CalendarComponent } from '@root/pages/dashboard/components/calendar/calendar.component';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { EmailContentComponent } from './components/emails/components/email-content/email-content.component';
import { EmailChatComponent } from './components/emails/components/email-chat/email-chat.component';
import { EmailsComponent } from './components/emails/components/email/emails.component';
import { AutoLoginAllRoutesGuard } from 'angular-auth-oidc-client';
import { SafeHtmlPipe } from './components/emails/pipe/safe-html.pipe';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { SecurityGuard } from '@root/shared/guards/security.guard';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: DashboardComponent,
    canActivate: [AutoLoginAllRoutesGuard]
  },
  {
    path: ApplicationRoutes.Calender,
    component: CalendarComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanAccessCalander
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
  {
    path: ApplicationRoutes.Email,
    component: EmailsComponent,
    outlet: 'sidenav',
    data: {
      permission: Permission.CanAccessEmail
    },
    canActivate: [
      AutoLoginAllRoutesGuard,
      SecurityGuard
    ]
  },
];
@NgModule({
  declarations: [
    DashboardComponent,
    AssignedTasksComponent,
    StickyNotesComponent,
    StickyNotesCardComponent,
    AssignedTasksItemComponent,
    CalendarComponent,
    EmailsComponent,
    EmailContentComponent,
    EmailChatComponent,
    SafeHtmlPipe
  ],
  imports: [
    CommonModule,
    MatIconModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  providers: [
  ]
})
export class DashboardModule { }
