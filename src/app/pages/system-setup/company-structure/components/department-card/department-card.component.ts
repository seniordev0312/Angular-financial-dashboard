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

  constructor(
    private layoutService: LayoutService,
    private router: Router) { }

  ngOnInit(): void {
    console.log('Department', this.data);

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
}
