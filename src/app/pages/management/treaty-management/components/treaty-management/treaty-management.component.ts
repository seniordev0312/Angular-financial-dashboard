import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-treaty-management',
  templateUrl: './treaty-management.component.html',
  styleUrls: ['./treaty-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreatyManagementComponent implements OnInit {

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.TreatyManagement,
          translationKey: 'treaty-management.treaty-management'
        }
      ],
    });
  }

}
