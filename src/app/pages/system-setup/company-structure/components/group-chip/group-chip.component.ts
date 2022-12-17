import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-group-chip',
  templateUrl: './group-chip.component.html',
  styleUrls: ['./group-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupChipComponent extends BaseComponent implements OnInit {

  @Input() item: any;
  isElementSelected = false;

  constructor(
    private layoutService: LayoutService,
    private cdr: ChangeDetectorRef,
    private router: Router) { super(); }
  ngOnInit(): void {
    this.subscriptions.add(this.layoutService.isRightSidenavOpened$.subscribe(data => {
      if (!data) {
        this.isElementSelected = false;
        this.cdr.detectChanges();
      }
    }));
  }
  onElementViewed() {
    console.log(this.item);
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.CompanyStructure}`, {
      outlets: { sidenav: `${ApplicationRoutes.AddGroup}` },
    }], {
      skipLocationChange: true, queryParams: {
        parentId: this.item.parentId,
        id: this.item.id,
        name: this.item.name
      },
    });

    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

}
