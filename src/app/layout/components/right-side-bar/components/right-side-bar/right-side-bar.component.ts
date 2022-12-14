import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';
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
  isSpinning$: Observable<boolean>;

  constructor(private router: Router) { super(); }

  ngOnInit(): void {
    this.isSpinning$ = isSidenavSpinning$;

    this.subscriptions.add(this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === 'sidenav') {
        this.outlet.deactivate();
      }
    }));

  }
}
