import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { ElementsListItem } from '../../models/element-list-item.model';
import { SectionDetails } from '../../models/section-details.model';
import { SectionsListRepository } from '../../store/sections-list.repository';

@Component({
  selector: 'app-section-card',
  templateUrl: './section-card.component.html',
  styleUrls: ['./section-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SectionCardComponent {
  @Input() data: SectionDetails;
  showElementsList = false;

  constructor(private layoutService: LayoutService,
    private sectionsListRepository: SectionsListRepository,
    private router: Router) { }

  onSectionEdited() {
    this.sectionsListRepository.updateSelectedSection(this.data);
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesListManagement}`, {
      outlets: { sidenav: `${ApplicationRoutes.EntitiesSection}/${ApplicationRoutes.Edit}` },
    }], { skipLocationChange: true, queryParams: { id: this.data.entitySectionId } });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }


  onElementAdded() {
    this.sectionsListRepository.updateSelectedSection(this.data);
    this.sectionsListRepository.updateSelectedElement({} as ElementsListItem);

    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesListManagement}`, {
      outlets: { sidenav: `${ApplicationRoutes.EntitiesElement}/${ApplicationRoutes.Add}` },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  toggleElementsListVisibility() {
    this.sectionsListRepository.updateSelectedSection(this.data);
    this.showElementsList = !this.showElementsList;
  }
}
