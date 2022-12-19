import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-department-card',
  templateUrl: './department-card.component.html',
  styleUrls: ['./department-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DepartmentCardComponent implements OnInit {
  @Input() data: any;
  showElementsList = false;

  constructor(
    private layoutService: LayoutService,
    private router: Router) { }

  ngOnInit(): void { }

  onGroupAdded(): void {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.CompanyStructure}`, {
      outlets: {
        sidenav: ApplicationRoutes.AddGroup
      },
    }], {
      queryParams: {
        level: this.data.level,
        parentId: this.data.id
      },
      skipLocationChange: true,
    });

    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }
  EditDepartment(): void {
    console.log('BATATA');
  }
  toggleElementsListVisibility() {
    // this.sectionsListRepository.updateSelectedSection(this.data);
    this.showElementsList = !this.showElementsList;
  }
}
