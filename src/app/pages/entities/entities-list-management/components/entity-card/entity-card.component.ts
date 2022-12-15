import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { Observable } from 'rxjs';
import { SectionDetails } from '../../models/section-details.model';
import { EntitiesListService } from '../../services/entities-list.service';
import { EntitiesListRepository } from '../../store/entities-list.repository';
import { isCreateEntityValid$ } from '../../store/entities-list.store';
import { SectionsListRepository } from '../../store/sections-list.repository';

@Component({
  selector: 'app-entity-card',
  templateUrl: './entity-card.component.html',
  styleUrls: ['./entity-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityCardComponent extends BaseComponent implements OnInit {
  @Input() fg: FormGroup;
  @Input() isEditMode: boolean;

  isCreateEntityValid$: Observable<boolean>;

  constructor(
    private layoutService: LayoutService,
    private entitiesListService: EntitiesListService,
    private entitiesListRepository: EntitiesListRepository,
    private sectionsListRepository: SectionsListRepository,
    private router: Router) { super(); }

  ngOnInit(): void {
    this.isCreateEntityValid$ = isCreateEntityValid$;
  }

  onSectionAdded() {
    this.sectionsListRepository.updateSelectedSection({} as SectionDetails);
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesListManagement}`, {
      outlets: { sidenav: `${ApplicationRoutes.EntitiesSection}/${ApplicationRoutes.Add}` },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  checkCodeValidation() {
    const data = this.fg.value;
    if (data.name?.length > 0 && data.code?.length > 0 && this.isNameOrCodeChanged()) {
      this.entitiesListService.checkCreateEntityValidation(data.name, data.code);
    }
  }

  isNameOrCodeChanged() {
    const data = this.fg.value;
    return data.name !== this.entitiesListRepository.values.entityDetails.entityName || data.code !== this.entitiesListRepository.values.entityDetails.entityCode;
  }
}
