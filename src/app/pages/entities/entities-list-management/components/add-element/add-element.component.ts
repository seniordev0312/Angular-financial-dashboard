import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { DialogMode } from '@root/shared/models/enums/dialog-mode.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ElementFormGroup } from '../../form-groups/element-form-group.service';
import { AddElement } from '../../models/add-element-list-item.model';
import { ElementsListItem } from '../../models/element-list-item.model';
import { ElementService } from '../../services/element.service';
import { elementDetails$ } from '../../store/entities-list.store';
import { ConfirmationDialogService } from '@root/shared/notifications/services/dialog-confirmation.service';
import { take } from 'rxjs';
import { elementTypesReferenceList$ } from '@root/pages/entities/store/shared-entities.store';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { EntitiesReferenceListsService } from '@root/pages/entities/services/reference-lists.service';
import { EntitiesListRepository } from '../../store/entities-list.repository';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddElementComponent extends BaseComponent implements OnInit {

  fg: FormGroup;
  mode: DialogMode = DialogMode.Add;
  elementsListItem: ElementsListItem;
  elementTypesReferenceList: BaseListItem[];

  constructor(private elementFormGroup: ElementFormGroup,
    private layoutService: LayoutService,
    private elementService: ElementService,
    private entitiesReferenceListsService: EntitiesReferenceListsService,
    private entitiesListRepository: EntitiesListRepository,
    private confirmationDialogService: ConfirmationDialogService,
    private cdr: ChangeDetectorRef,
    private activeRoute: ActivatedRoute) { super(); }

  ngOnInit(): void {
    this.entitiesReferenceListsService.getElementTypesReferenceList();

    this.subscriptions.add(this.activeRoute.queryParams.subscribe(params => {
      if (params.name) {
        this.mode = DialogMode.Edit;
      }
      else {
        this.fg = this.elementFormGroup.getFormGroup();
      }
    }));

    this.subscriptions.add(elementDetails$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.elementsListItem = data;
        this.fg = this.elementFormGroup.getFormGroup(data);
        if (this.isUpdateMode() && data.lockModifications) {
          Object.values(this.fg.controls).forEach(control => {
            control.disable();
          });
          this.cdr.detectChanges();
        }
      }
    }));

    this.subscriptions.add(elementTypesReferenceList$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.elementTypesReferenceList = data;
      }
    }));
  }

  onSave(): void {
    if (this.fg.valid) {
      const entityDefinitionField = this.elementFormGroup.getValueFromFormGroup(this.fg);
      const data: AddElement = {
        entityDefinitionField,
        entityDefinitionId: this.entitiesListRepository.values.sectionDetails.entityDefinitionId,
        entityDefinitionSectionId: this.entitiesListRepository.values.sectionDetails.entitySectionId,
      };

      if (this.isCreateMode) {
        this.elementService.addElement(data);
      }
      else {
        this.elementService.editElement(data);
      }
      this.layoutService.closeRightSideNav();
    }
  }


  onClose(): void {
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

  onElementDeleted() {
    this.confirmationDialogService.open({
      description: 'Are you sure you want to delete this section?',
      title: 'Delete Section',
      icon: 'error_outline',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
      actionButtonsColor: 'warn',
      iconCssClasses: 'text-warn',
    });

    this.subscriptions.add(
      this.confirmationDialogService.confirmed().pipe(take(1)).subscribe((isConfirmed) => {
        if (isConfirmed) {
          const entitySectionId = this.entitiesListRepository.values.sectionDetails.entitySectionId;
          const entityDefinitionId = this.entitiesListRepository.values.sectionDetails.entityDefinitionId;

          this.elementService.deleteElement(entityDefinitionId,
            entitySectionId, this.elementsListItem.elementName);
        }
      }));
  }
}
