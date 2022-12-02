import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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
  rightSidenavMode$ = this.layoutService.rightSidenavMode$;
  isRightSidenavOpened$ = this.layoutService.isRightSidenavOpened$;
  showCrumb: boolean = false;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
  ) {
    this.updateBreadCrumbsRouter();
  }
  ngOnInit(): void {
    this.router.events.subscribe((val: NavigationEnd) => {
      if (val.url === '/dashboard') {
        this.showCrumb = false;
      } else {
        this.showCrumb = true;
      }
    });
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
