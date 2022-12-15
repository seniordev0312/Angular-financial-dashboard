import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EntityTemplatesListItem } from '@root/pages/entities/entities-templates-management/models/entity-templates-list-item.model';
import { EntitiesTemplatesListService } from '@root/pages/entities/entities-templates-management/services/entities-templates-list.service';
import { templatesList$ } from '@root/pages/entities/entities-templates-management/store/entities-templates.store';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { DialogMode } from '@root/shared/models/enums/dialog-mode.model';
import { ConfirmationDialogService } from '@root/shared/notifications/services/dialog-confirmation.service';
import { LayoutService } from '@root/shared/services/layout.service';
import { take } from 'rxjs';
import { SectionFormGroup } from '../../form-groups/section-form-group.service';
import { SectionDetails } from '../../models/section-details.model';
import { SectionService } from '../../services/section.service';
import { sectionDetails$ } from '../../store/entities-list.store';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddSectionComponent extends BaseComponent implements OnInit {
  fg: FormGroup;
  mode: DialogMode = DialogMode.Add;
  templatesList: BaseListItem[];
  sectionDetails: SectionDetails;

  constructor(private sectionFormGroup: SectionFormGroup,
    private layoutService: LayoutService,
    private confirmationDialogService: ConfirmationDialogService,
    private entitiesTemplatesListService: EntitiesTemplatesListService,
    private sectionService: SectionService,
    private activeRoute: ActivatedRoute) { super(); }

  ngOnInit(): void {
    this.entitiesTemplatesListService.getEntitiesTemplatesList();
    this.subscriptions.add(templatesList$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.templatesList = data.map((e: EntityTemplatesListItem) => ({
          id: e.entitySectionTemplateId,
          value: e.name
        }));
      }
    }));
    this.subscriptions.add(this.activeRoute.queryParams.subscribe(params => {
      if (params.id) {
        this.mode = DialogMode.Edit;
      }
      else {
        this.fg = this.sectionFormGroup.getFormGroup();
      }
    }));

    this.subscriptions.add(sectionDetails$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.sectionDetails = data;
        this.fg = this.sectionFormGroup.getFormGroup(data);
      }
    }));
  }

  onSave(): void {
    if (this.fg.valid) {
      const data = this.sectionFormGroup.getValueFromFormGroup(this.fg);
      if (this.isCreateMode) {
        delete data.id;
      }
      this.sectionService.addOrUpdateSection(data);
      this.layoutService.closeRightSideNav();
    }
  }


  onClose(): void {
    this.layoutService.closeRightSideNav();
  }

  onSectionDeleted(): void {
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
          this.sectionService.deleteSection(this.sectionDetails.entityDefinitionId, this.sectionDetails.entitySectionId);
        }
      }));
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
