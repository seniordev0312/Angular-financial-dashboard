import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ActivationStart, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { isSidenavSpinning$ } from '@root/shared/store/shared.store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class RightSideBarComponent extends BaseComponent implements OnInit {
  @ViewChild(RouterOutlet) outlet: RouterOutlet;
  path: string = '>';
  extended: boolean = true;
  canToggle: boolean = true;
  @Output() toggleRightSidenavCollapsedEvent: EventEmitter<any> = new EventEmitter<boolean>();
  isSpinning$: Observable<boolean>;

  constructor(private router: Router) { super(); }

  ngOnInit(): void {
    this.isSpinning$ = isSidenavSpinning$;

    this.subscriptions.add(this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === 'sidenav') {
        this.outlet.deactivate();
      }
    }));
    this.router.events.subscribe((val: NavigationEnd) => {
      if (val.url?.includes(`/${ApplicationRoutes.Dashboard}`))
        this.canToggle = true;
      else {
        this.canToggle = false;
      }
    });
  }

  toggleRightSidenav() {
    this.extended = !this.extended;
    this.path = this.extended ? '>' : '<';
    this.toggleRightSidenavCollapsedEvent.emit(this.extended);
  }
}
