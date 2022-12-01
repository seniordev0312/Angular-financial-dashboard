import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
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

  showCrumb: boolean = false;

  isRTLDirection$ = this.layoutService.isRTLDirection$;

  constructor(
    private layoutService: LayoutService,
    private router: Router
  ) {
    router.events.subscribe((val: NavigationEnd) => {
      if (val.url === '/dashboard') {
        console.log(val);
        this.showCrumb = false;
      } else {
        this.showCrumb = true;
      }
    });
  }

  ngOnInit(): void {
  }

  LSideBarToggle() {
    throw new Error('Method not implemented.');
  }

  navigate(breadcrumb: string): void {
    this.router.navigate([breadcrumb])
  }

}
