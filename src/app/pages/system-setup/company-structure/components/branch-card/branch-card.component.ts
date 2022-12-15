import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-branch-card',
  templateUrl: './branch-card.component.html',
  styleUrls: ['./branch-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BranchCardComponent implements OnInit {
  @Input() data: any;

  constructor(
    private layoutService: LayoutService,
    private router: Router) { }

  ngOnInit(): void {
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
