import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { DialogMode } from '@root/shared/models/enums/dialog-mode.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { RelationshipTypesFormGroup } from '../../form-groups/relationship-types-form-group.service';
import { EntitiesRelationshipTypesListService } from '../../services/entities-relationship-types-list.service';
import { entityTypesList$, relationshipTypeDetails$ } from '../../store/entities-relationship-types.store';

@Component({
  selector: 'app-add-relationship-type',
  templateUrl: './add-relationship-type.component.html',
  styleUrls: ['./add-relationship-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AddRelationshipTypeComponent extends BaseComponent implements OnInit {
  fg: FormGroup;
  allowedEntitiesFormControl = new FormControl();
  entityTypesList: BaseListItem[]
  mode: DialogMode = DialogMode.Add;

  constructor(private relationshipTypesFormGroup: RelationshipTypesFormGroup,
    private entitiesRelationshipTypesListService: EntitiesRelationshipTypesListService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private layoutService: LayoutService) { super(); }

  get allowedEntities() {
    return this.fg && this.fg.get('allowedEntities').value;
  }

  ngOnInit(): void {
    this.entitiesRelationshipTypesListService.getEntitiesTypesList();
    this.subscriptions.add(entityTypesList$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.entityTypesList = data.map(e => ({ id: e.code, value: e.name }));
      }
    }));


    this.subscriptions.add(this.activeRoute.params.subscribe(params => {
      if (params?.id) {
        this.mode = DialogMode.Edit;
        this.entitiesRelationshipTypesListService.getTypeDetails(params.id);
      }
      else {
        this.fg = this.relationshipTypesFormGroup.getFormGroup();
      }
    }));

    this.subscriptions.add(relationshipTypeDetails$.subscribe(data => {
      if (!this.isEmpty(data) && this.isUpdateMode()) {
        this.fg = this.relationshipTypesFormGroup.getFormGroup(data);
        this.cdr.detectChanges();
      }
    }));
  }

  onSave(): void {
    if (this.fg.valid) {
      const data = this.relationshipTypesFormGroup.getValueFromFormGroup(this.fg);
      if (this.isCreateMode()) {
        delete data.entityTypeRelationshipId;
        this.entitiesRelationshipTypesListService.addType(data);
      }
      else {
        this.entitiesRelationshipTypesListService.editType(data);
      }
      this.fg.reset();
      this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesRelationshipTypesManagement}`, {
        outlets: { sidenav: null },
      }], { skipLocationChange: true });
      this.layoutService.closeRightSideNav();
    }
  }

  onClose(): void {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesRelationshipTypesManagement}`, {
      outlets: { sidenav: null },
    }], { skipLocationChange: true });
    this.layoutService.closeRightSideNav();
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  removeChip(index: string) {
    let allowedEntitiesList = this.allowedEntities;
    allowedEntitiesList = allowedEntitiesList.filter((e: string) => e !== index);
    this.fg.patchValue({ allowedEntities: allowedEntitiesList });
  }

  onAddClicked() {
    const allowedEntitiesList = this.allowedEntities ?? [];
    this.fg.patchValue({ allowedEntities: [this.allowedEntitiesFormControl.value, ...allowedEntitiesList] });
    this.allowedEntitiesFormControl.reset();
  }

  isCreateMode() {
    return this.mode === DialogMode.Add;
  }

  isUpdateMode() {
    return this.mode === DialogMode.Edit;
  }

  getAllowedEntityLabel(id: string) {
    return this.allowedEntities && this.entityTypesList.find(e => e.id === id)?.value;
  }
}
