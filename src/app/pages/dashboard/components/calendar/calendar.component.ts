import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { LayoutService } from '@root/shared/services/layout.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {
  accessEmailPermission = Permission.CanAccessEmail;

  calenders: any[] = [
    {
      meetings: [{}, {}]
    },
    {
      meetings: [{}, {}, {}]
    }
  ];
  constructor(
    private layoutService: LayoutService
  ) { }
  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({});
  }

}
