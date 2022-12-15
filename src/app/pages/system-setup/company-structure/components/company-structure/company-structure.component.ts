import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { TreeNode } from 'primeng/api';
import { treeNode$ } from '../../store/company-structure.store';
@Component({
  selector: 'app-company-structure',
  templateUrl: './company-structure.component.html',
  styleUrls: ['./company-structure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyStructureComponent extends BaseComponent implements OnInit {
  data: TreeNode[];
  constructor(
    private layoutService: LayoutService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.SystemSetup,
          translationKey: 'system-setup.system-setup'
        },
        {
          route: ApplicationRoutes.CompanyStructure,
          translationKey: 'system-setup.company-structure'
        }
      ],
    });

    this.subscriptions.add(
      treeNode$.subscribe((data) => {
        if (data) {
          console.log('treeNode$', this.data);
          this.data = data;
        }
      })
    );

    this.data = [
      {
        type: 'company',
        expanded: true,
        key: '1',
        data: { name: 'Company Name', level: 1 },
        children: [
          // {
          //   type: 'branch',
          //   expanded: true,
          //   data: { name: 'branch A' },
          //   children: [
          //     {
          //       type: 'group',
          //       expanded: true,
          //       data: { name: 'Group 1' },
          //     },
          //     {
          //       type: 'group',
          //       expanded: true,
          //       data: { name: 'Group 2' },
          //     }
          //   ]
          // },
          // {
          //   type: 'department',
          //   expanded: true,
          //   data: { name: 'Department 1' },
          // },
        ]
      }
    ];
  }


}
