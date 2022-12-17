import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  showElementsList = false;

  @Output() onCopyBranch: EventEmitter<any> = new EventEmitter<any>();

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

  toggleElementsListVisibility() {
    // this.sectionsListRepository.updateSelectedSection(this.data);
    this.showElementsList = !this.showElementsList;
  }

  copyBranch(): void {
    // this.onCopyBranch.emit({ parentId })
  }

  onDepartmentAdded(): void {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.CompanyStructure}`, {
      outlets: {
        sidenav: ApplicationRoutes.AddDepartment
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
}
