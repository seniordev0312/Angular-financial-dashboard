import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-correspondence-management',
  templateUrl: './correspondence-management.component.html',
  styleUrls: ['./correspondence-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorrespondenceManagementComponent implements OnInit {

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.CorrespondenceManagement,
          translationKey: 'correspondence-management.correspondence-management'
        }
      ],
    });
  }

}
