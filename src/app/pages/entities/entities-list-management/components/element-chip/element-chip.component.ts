import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-element-chip',
  templateUrl: './element-chip.component.html',
  styleUrls: ['./element-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementChipComponent implements OnInit {

  constructor(private layoutService: LayoutService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onElementViewed() {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesListManagement}`, {
      outlets: { sidenav: `${ApplicationRoutes.EntitiesElement}/2` },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

}
