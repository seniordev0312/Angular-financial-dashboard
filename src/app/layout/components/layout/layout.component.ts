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
  isLSideBarOpen: boolean = true;
  routeCrumbsList: RouteCrumbsList;
  isRTLDirection$ = this.layoutService.isRTLDirection$;
  rightSidenavMode$ = this.layoutService.rightSidenavMode$;
  isRightSidenavOpened$ = this.layoutService.isRightSidenavOpened$;
  showBreadcrumb: boolean = false;
  mainContentClass: any = { 'h-full': true };
  ml: string = '384px';
  constructor(
    private layoutService: LayoutService,
    private router: Router,
  ) {
    this.updateBreadCrumbsRouter();
  }

  ngOnInit(): void {
    this.showBreadcrumb = this.router.url !== '/dashboard';
    document.documentElement.style.setProperty('--sidenav-width', '40vh');
    this.router.events.subscribe((val: NavigationEnd) => {
      if (val.url === '/dashboard') {
        this.showBreadcrumb = false;
        this.mainContentClass = { 'h-full': true };
      } else {
        this.showBreadcrumb = true;
        this.mainContentClass = { 'h-[95%]': true }
      }
    });
  }

  handleCrumb(show: boolean) {
    if (show) {
      this.showBreadcrumb = true;
      this.mainContentClass = { 'h-[95%]': true };
    } else {
      this.showBreadcrumb = false;
      this.mainContentClass = { 'h-full': true };
    }
  }

  LSideBarToggle() {
    throw new Error('Method not implemented.');
  }

  updateBreadCrumbsRouter(): void {
    this.layoutService.breadcrumbsRoutes$.subscribe((routeCrumbsList: RouteCrumbsList) => {
      this.routeCrumbsList = routeCrumbsList;
    });
  }

  toggleSidenav(extended: any): void {
    const size = extended ? '384px' : '50px';
    document.documentElement.style.setProperty('--sidenav-width', size);
    if (extended) {
      this.ml = '384px'
    } else {
      this.ml = '50px'
    }
  }
}
