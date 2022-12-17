import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { LayoutService } from '@root/shared/services/layout.service';
import { EmailItem } from '../../models/email-item.model';
import { EmailsService } from '../../services/emails.service';
import { emails$ } from '../../store/emails.store';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailsComponent extends BaseComponent implements OnInit {

  emails: any[] = [];

  constructor(
    private layoutService: LayoutService,
    private emailsService: EmailsService
  ) {
    super();
  }
  ngOnInit(): void {

    this.subscriptions.add(
      emails$.subscribe((data: EmailItem[]) => {
        console.log(data);
        this.emails = data;
      })
    )
    this.layoutService.updateBreadCrumbsRouter({});
    this.emailsService.getEmails(0, 100);

  }
}
