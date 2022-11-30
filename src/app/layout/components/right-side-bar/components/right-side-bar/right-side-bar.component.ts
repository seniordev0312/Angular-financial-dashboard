import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ActivationStart, Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightSideBarComponent implements OnInit {
  @ViewChild(RouterOutlet) outlet: RouterOutlet;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.events.subscribe(e => {
      if (e instanceof ActivationStart && e.snapshot.outlet === 'sidenav') {
        this.outlet.deactivate();
      }
    });
  }
}
