import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyCardComponent implements OnInit {

  @Input() data: any;

  constructor(
    private layoutService: LayoutService,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.data);

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
    console.log();
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.CompanyStructure}`, {
      outlets: {
        sidenav: ApplicationRoutes.AddBranch
      },
    }], {
      queryParams: {
        level: this.data.level,
      },
      skipLocationChange: true,
    });

    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  onDepartmentAdded(): void {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.CompanyStructure}`, {
      outlets: {
        sidenav: ApplicationRoutes.AddDepartment
      },
    }], {
      queryParams: {
        level: this.data.level,
        id: 12,
      },
      skipLocationChange: true,
    });

    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }
}
