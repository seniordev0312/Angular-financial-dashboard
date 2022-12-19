import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { RouteCrumbsList } from '@root/shared/models/bread-crumbs/router-crumbs-list.model';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { isSpinning$ } from '@root/shared/store/shared.store';
import { Observable } from 'rxjs';
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
  ml: string = '320px';
  mr: string = '320px';
  isSpinning$: Observable<boolean>;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
  ) {
    this.updateBreadCrumbsRouter();
  }

  ngOnInit(): void {
    if (this.router.url !== '/dashboard')
      this.handleCrumb(true);
    else
      this.handleCrumb(false);
    document.documentElement.style.setProperty('--left-sidenav-width', '320px');
    document.documentElement.style.setProperty('--right-sidenav-width', '320px');
    this.isSpinning$ = isSpinning$;
    this.router.events.subscribe((val: NavigationEnd) => {
      if (!val.url?.includes(`/${ApplicationRoutes.Dashboard}`))
        this.handleCrumb(true);
      else {
        this.handleCrumb(false);
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
    const size = extended ? '320px' : '50px';
    document.documentElement.style.setProperty('--left-sidenav-width', size);
    if (extended) {
      this.ml = '320px'
    } else {
      this.ml = '50px'
    }
  }
  toggleRightSidenav(extended: any) {
    const size = extended ? '320px' : '18px';
    document.documentElement.style.setProperty('--right-sidenav-width', size);
    if (extended) {
      this.mr = '320px'
    } else {
      this.mr = '20px'
    }
  }
}
