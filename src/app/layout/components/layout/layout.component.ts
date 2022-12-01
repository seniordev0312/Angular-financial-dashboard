import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouteCrumbsList } from '@root/shared/models/bread-crumbs/router-crumbs-list.model';
import { LayoutService } from 'src/app/shared/services/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent implements OnInit {


  RSideBarOpen: boolean = false;
  LSideBarOpen: boolean = true;
  routeCrumbsList: RouteCrumbsList;

  isRTLDirection$ = this.layoutService.isRTLDirection$;

  constructor(
    private layoutService: LayoutService,
  ) {
    this.updateBreadCrumbsRouter();
  }

  ngOnInit(): void {
  }

  LSideBarToggle() {
    throw new Error('Method not implemented.');
  }

  updateBreadCrumbsRouter(): void {
    this.layoutService.breadcrumbsRoutes$.subscribe((routeCrumbsList: RouteCrumbsList) => {
      this.routeCrumbsList = routeCrumbsList;
    });
  }

}
