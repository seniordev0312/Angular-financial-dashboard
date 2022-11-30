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
import { EmailsComponent } from '@root/pages/dashboard/components/emails/emails.component';

const routes: Route[] = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: '',
    component: CalendarComponent,
    outlet: 'sidenav',
  },
  {
    path: 'email',
    component: EmailsComponent,
    outlet: 'sidenav',
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
    EmailsComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule { }
