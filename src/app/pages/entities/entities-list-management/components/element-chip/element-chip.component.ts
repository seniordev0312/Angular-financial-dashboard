import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { ElementsListItem } from '../../models/element-list-item.model';
import { SectionsListRepository } from '../../store/sections-list.repository';

@Component({
  selector: 'app-element-chip',
  templateUrl: './element-chip.component.html',
  styleUrls: ['./element-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ElementChipComponent extends BaseComponent implements OnInit {
  @Input() element: ElementsListItem;
  isElementSelected = false;

  constructor(private layoutService: LayoutService,
    private sectionsListRepository: SectionsListRepository,
    private cdr: ChangeDetectorRef,
    private router: Router) { super(); }

  ngOnInit(): void {
    this.subscriptions.add(this.layoutService.isRightSidenavOpened$.subscribe(data => {
      if (!data) {
        this.isElementSelected = false;
        this.cdr.detectChanges();
      }
    }));
  }

  onElementViewed() {
    this.isElementSelected = true;
    this.sectionsListRepository.updateSelectedElement(this.element);
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesListManagement}`, {
      outlets: { sidenav: `${ApplicationRoutes.EntitiesElement}/${ApplicationRoutes.Edit}` },
    }], { skipLocationChange: true, queryParams: { name: this.element.elementName } });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

}
