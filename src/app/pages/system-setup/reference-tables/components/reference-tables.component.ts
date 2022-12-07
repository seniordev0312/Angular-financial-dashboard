import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-reference-tables',
  templateUrl: './reference-tables.component.html',
  styleUrls: ['./reference-tables.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferenceTablesComponent implements OnInit {

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.SystemSetup,
          translationKey: 'system-setup.system-setup.system-setup'
        },
        {
          route: ApplicationRoutes.ReferenceTables,
          translationKey: 'system-setup.system-setup.reference-tables'
        }
      ],
    });
  }
}
