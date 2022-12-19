import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { DialogMode } from '@root/shared/models/enums/dialog-mode.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { EntityMappingFormGroup } from '../../form-groups/entity-mapping-form-group.service';
import { AddEntityMapping } from '../../models/add-entity-mapping.model';
import { EntitiesMappingsListService } from '../../services/entities-mappings-list.service';
import { EntitiesMappingRepository } from '../../store/entities-mapping.repository';
import { mappingDetails$ } from '../../store/entities-mapping.store';

@Component({
  templateUrl: './add-new-mapping.component.html',
  styleUrls: ['./add-new-mapping.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AddNewMappingComponent extends BaseComponent implements OnInit {

  fg: FormGroup;
  mode: DialogMode = DialogMode.Add;
  sourceId: string;
  constructor(
    private entityMappingFormGroup: EntityMappingFormGroup,
    private activeRoute: ActivatedRoute,
    private entitiesMappingsListService: EntitiesMappingsListService,
    private entitiesMappingRepository: EntitiesMappingRepository,
    private router: Router,
    private layoutService: LayoutService) { super(); }

  ngOnInit(): void {
    this.entitiesMappingRepository.updateSelectedMapping({} as AddEntityMapping);

    this.subscriptions.add(this.activeRoute.queryParams.subscribe(params => {
      if (params?.id) {
        this.mode = DialogMode.Edit;
        this.entitiesMappingsListService.getMappingDetails(params.id, params.sourceId);
      }
      else {
        this.fg = this.entityMappingFormGroup.getFormGroup();
      }
      this.sourceId = params.sourceId;

    }));

    this.subscriptions.add(mappingDetails$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.fg = this.entityMappingFormGroup.getFormGroup(data);
      }
    }));
  }

  onSave(): void {
    if (this.fg.valid) {
      const data = this.entityMappingFormGroup.getValueFromFormGroup(this.fg);
      if (this.isCreateMode()) {
        delete data.fieldId;
        this.entitiesMappingsListService.addMapping(data, this.sourceId);
      }
      else {
        this.entitiesMappingsListService.editMapping(data, this.sourceId);
      }
      this.fg.reset();
      this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesMappingManagement}`, {
        outlets: { sidenav: null },
      }], { skipLocationChange: true });
      this.layoutService.closeRightSideNav();
    }
  }


  onClose(): void {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesMappingManagement}`, {
      outlets: { sidenav: null },
    }], { skipLocationChange: true });
    this.layoutService.closeRightSideNav();
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  isCreateMode() {
    return this.mode === DialogMode.Add;
  }

  isUpdateMode() {
    return this.mode === DialogMode.Edit;
  }
}