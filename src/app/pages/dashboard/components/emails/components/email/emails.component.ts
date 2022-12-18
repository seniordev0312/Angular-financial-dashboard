import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { LayoutService } from '@root/shared/services/layout.service';
import { SignalRService } from '@root/shared/services/signalR.service';

import { EmailItem } from '../../models/email-item.model';
import { EmailsService } from '../../services/emails.service';
import { emails$ } from '../../store/emails.store';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailsComponent extends BaseComponent implements OnInit, OnDestroy {
  accessCalenderPermission = Permission.CanAccessCalender;

  emails: any[] = [];
  email: any;
  showEmails: boolean = true;

  constructor(
    private layoutService: LayoutService,
    private emailsService: EmailsService,
    private cdr: ChangeDetectorRef,
    private signal: SignalRService
  ) {
    super();
  }
  ngOnInit(): void {
    document.documentElement.style.setProperty('--right-sidenav-width', '320px');
    this.layoutService.showToggleInRightSideNav();
    this.signal.initiateEmailSignalRConnection()
    this.subscriptions.add(
      emails$.subscribe((data: EmailItem[]) => {
        console.log(data);
        this.emails = data;
        this.cdr.detectChanges();
      })
    )
    this.layoutService.updateBreadCrumbsRouter({});
    this.emailsService.getEmails(0, 100);
  }

  onEmailContentClick(_item?: any): void {
    this.email = _item;
    this.showEmails = !this.showEmails;
    if (!this.showEmails) {
      document.documentElement.style.setProperty('--right-sidenav-width', '650px');
      this.layoutService.hideToggleInRightSideNav();
    } else {
      this.email = undefined;
      document.documentElement.style.setProperty('--right-sidenav-width', '320px');
      this.layoutService.showToggleInRightSideNav();
    }
  }

  OnDestroy() {
    console.log('OnDestroy');
    document.documentElement.style.setProperty('--right-sidenav-width', '320px');
    this.layoutService.showToggleInRightSideNav();
  }

}
