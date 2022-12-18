import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EntitiesReferenceListsService } from '@root/pages/entities/services/reference-lists.service';
import { elementTypesReferenceList$ } from '@root/pages/entities/store/shared-entities.store';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { DialogMode } from '@root/shared/models/enums/dialog-mode.model';
import { FormArrayService } from '@root/shared/services/form-array.service';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AddTemplateFormGroup } from '../../form-groups/add-template-form-group.service';
import { TemplateElementFormGroup } from '../../form-groups/template-element-form-group.service';
import { EntityTemplatesListItem } from '../../models/entity-templates-list-item.model';
import { TemplateElement } from '../../models/template-elements-list-item.model';
import { EntitiesTemplatesListService } from '../../services/entities-templates-list.service';
import { EntitiesTemplatesRepository } from '../../store/entities-templates.repository';
import { templateDetails$ } from '../../store/entities-templates.store';

@Component({
  selector: 'app-add-entity-template',
  templateUrl: './add-entity-template.component.html',
  styleUrls: ['./add-entity-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEntityTemplateComponent extends BaseComponent implements OnInit {
  fg: FormGroup;
  templateFg: FormGroup;
  mode: DialogMode = DialogMode.Add;
  elementTypesReferenceList: BaseListItem[];

  constructor(private addTemplateFormGroup: AddTemplateFormGroup,
    private activeRoute: ActivatedRoute,
    private entitiesTemplatesListService: EntitiesTemplatesListService,
    private entitiesTemplatesRepository: EntitiesTemplatesRepository,
    private formArrayService: FormArrayService,
    private templateElementFormGroup: TemplateElementFormGroup,
    private entitiesReferenceListsService: EntitiesReferenceListsService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private layoutService: LayoutService) { super(); }

  get isCreateMode() {
    return this.mode === DialogMode.Add;
  }

  get isUpdateMode() {
    return this.mode === DialogMode.Edit;
  }

  get isViewMode() {
    return this.mode === DialogMode.View;
  }

  get title() {
    if (this.mode === DialogMode.View) {
      return 'View Entity Template';
    }
    else if (this.mode === DialogMode.Add) {
      return 'Add Entity Template';
    }
    return 'Edit Entity Template';
  }


  ngOnInit(): void {
    this.entitiesReferenceListsService.getElementTypesReferenceList();
    this.entitiesTemplatesRepository.updateSelectedTemplate({} as EntityTemplatesListItem);

    this.templateFg = this.templateElementFormGroup.getFormGroup();
    this.subscriptions.add(this.activeRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.mode = DialogMode.Edit;
        this.entitiesTemplatesListService.getEntitiesTemplateDetails(params.get('id'));
      }
      else {
        this.fg = this.addTemplateFormGroup.getFormGroup();
      }
    }));

    this.subscriptions.add(this.activeRoute.queryParamMap.subscribe(params => {
      if (params.get('isViewMode') === 'true') {
        this.mode = DialogMode.View;
      }
    }));

    this.subscriptions.add(templateDetails$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.fg = this.addTemplateFormGroup.getFormGroup(data);
        if (this.mode == DialogMode.View) {
          Object.values(this.fg.controls).forEach(control => {
            control.disable();
          });
        }
        this.cdr.detectChanges();
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
      const data = this.addTemplateFormGroup.getValueFromFormGroup(this.fg);
      if (this.isCreateMode) {
        delete data.entitySectionTemplateId;
        this.entitiesTemplatesListService.addTemplate(data);
      }
      else {
        this.entitiesTemplatesListService.editTemplate(data);
      }
      this.fg.reset();
      this.templateFg.reset();
      this.layoutService.closeRightSideNav();
    }
  }


  onClose(): void {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesTemplates}`, {
      outlets: { sidenav: null },
    }], { skipLocationChange: true });
    this.layoutService.closeRightSideNav();
  }

  getFormControl(key: string, fg: FormGroup): FormControl {
    return fg.controls[key] as FormControl;
  }

  onNewElementAdded(): void {
    const data: TemplateElement = this.templateElementFormGroup.getValueFromFormGroup(this.templateFg);
    this.formArrayService.getFormArrayItems('fields', this.fg).push(this.templateElementFormGroup.getFormGroup(data));
    this.templateFg.reset();
  }
}
