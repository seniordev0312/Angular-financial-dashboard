import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-company-structure',
  templateUrl: './company-structure.component.html',
  styleUrls: ['./company-structure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyStructureComponent implements OnInit {

  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.SystemSetup,
          translationKey: 'system-setup.system-setup.system-setup'
        },
        {
          route: ApplicationRoutes.CompanyStructure,
          translationKey: 'system-setup.system-setup.company-structure'
        }
      ],
    });
  }

  onGroupAdded(): void {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.CompanyStructure}`, {
      outlets: {
        sidenav: ApplicationRoutes.AddGroup
      },
    }], { skipLocationChange: true });

    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }
  onBranchAdded(): void {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.CompanyStructure}`, {
      outlets: {
        sidenav: ApplicationRoutes.AddBranch
      },
    }], { skipLocationChange: true });

    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }
  onDepartmentAdded(): void {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.CompanyStructure}`, {
      outlets: {
        sidenav: ApplicationRoutes.AddDepartment
      },
    }], { skipLocationChange: true });

    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }
}
