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
  showElementsList = false;

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
    }], {
      queryParams: {
        parentId: this.data.id
      },
      skipLocationChange: true,
    });

    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  onBranchAdded(): void {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.CompanyStructure}`, {
      outlets: {
        sidenav: ApplicationRoutes.AddBranch
      },
    }], {
      queryParams: {
        parentId: this.data.id
      },
      skipLocationChange: true,
    });

    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  toggleElementsListVisibility() {
    // this.sectionsListRepository.updateSelectedSection(this.data);
    this.showElementsList = !this.showElementsList;
  }
  onDepartmentAdded(): void {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.CompanyStructure}`, {
      outlets: {
        sidenav: ApplicationRoutes.AddDepartment
      },
    }], {
      queryParams: {
        parentId: this.data.id
      },
      skipLocationChange: true,
    });

    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }
}
