import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { RouteCrumbsList } from '@root/shared/models/bread-crumbs/router-crumbs-list.model';
import { LayoutService } from '@root/shared/services/layout.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BreadcrumbsComponent extends BaseComponent implements OnInit {
  routeCrumbsList: RouteCrumbsList;

  constructor(private layoutService: LayoutService, private cdr: ChangeDetectorRef) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.layoutService.breadcrumbsRoutes$.subscribe(data => {
      if (data) {
        this.routeCrumbsList = data;
        this.cdr.detectChanges();
      }
    }));
  }
}
