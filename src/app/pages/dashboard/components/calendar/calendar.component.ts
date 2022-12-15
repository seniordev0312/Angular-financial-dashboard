import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarComponent implements OnInit {

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
