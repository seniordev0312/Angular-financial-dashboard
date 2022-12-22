import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';
import { RouteCrumbsList } from '../models/bread-crumbs/router-crumbs-list.model';
import { MatDrawerMode } from '@angular/material/sidenav';

@Injectable({
    providedIn: 'root',
})
export class LayoutService {
    breadcrumbsRoutesSubject = new BehaviorSubject<RouteCrumbsList>(null);
    breadcrumbsRoutes$ = this.breadcrumbsRoutesSubject.asObservable();

    updateBreadCrumbsRouter(data: RouteCrumbsList): void {
        this.breadcrumbsRoutesSubject.next(data);
    }

    einFocus = new BehaviorSubject<number>(-1);

    isRightSidenavOpenedSubject = new BehaviorSubject<boolean>(false);
    isRightSidenavOpened$ = this.isRightSidenavOpenedSubject.asObservable();

    rightSidenavModeSubject = new BehaviorSubject<MatDrawerMode>('side');
    rightSidenavMode$ = this.rightSidenavModeSubject.asObservable();

    canToggleRightSideNavSubject = new BehaviorSubject<boolean>(true);
    canToggleRightSideNav$ = this.canToggleRightSideNavSubject.asObservable();

    isDesktop$ = this.breakpointObserver.observe('(min-width: 1280px)').pipe(map((state) => state.matches));

    ltLg$ = this.breakpointObserver.observe('(max-width: 1500px)').pipe(map((state) => state.matches));

    gtMd$ = this.breakpointObserver.observe('(min-width: 960px)').pipe(map((state) => state.matches));

    ltMd$ = this.breakpointObserver.observe('(max-width: 959px)').pipe(map((state) => state.matches));

    gtSm$ = this.breakpointObserver.observe('(min-width: 600px)').pipe(map((state) => state.matches));

    isMobile$ = this.breakpointObserver.observe('(max-width: 599px)').pipe(map((state) => state.matches));

    isRTLDirection$ = new BehaviorSubject<boolean>(false);

    constructor(private breakpointObserver: BreakpointObserver) { }

    isLtLg = () => this.breakpointObserver.isMatched('(max-width: 1279px)');

    isMobile = () => this.breakpointObserver.isMatched('(max-width: 599px)');


    openRightSideNav(): void {
        this.isRightSidenavOpenedSubject.next(true);
    }

    closeRightSideNav(): void {
        this.isRightSidenavOpenedSubject.next(false);
    }

    showToggleInRightSideNav(): void {
        this.canToggleRightSideNavSubject.next(true);
    }
    hideToggleInRightSideNav(): void {
        this.canToggleRightSideNavSubject.next(false);
    }


    changeRightSideNavMode(mode: MatDrawerMode): void {
        this.rightSidenavModeSubject.next(mode);
    }

    changeEinFocus(value : number) {
        this.einFocus.next(value);
    }

    onHandleEinFocus(): Observable<any> {
        return this.einFocus.asObservable();
    }
}