import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { BreakpointObserver } from '@angular/cdk/layout';

@Injectable({
    providedIn: 'root',
})
export class LayoutService {

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


}
