import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { DialogMode } from '@root/shared/models/enums/dialog-mode.model';
import { FormArrayService } from '@root/shared/services/form-array.service';
import { LayoutService } from '@root/shared/services/layout.service';
import { AddTemplateFormGroup } from '../../form-groups/add-template-form-group.service';
import { TemplateElementFormGroup } from '../../form-groups/template-element-form-group.service';

@Component({
  selector: 'app-add-entity-template',
  templateUrl: './add-entity-template.component.html',
  styleUrls: ['./add-entity-template.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddEntityTemplateComponent implements OnInit {
  fg: FormGroup;
  mode: DialogMode = DialogMode.Add;
  constructor(private addTemplateFormGroup: AddTemplateFormGroup,
    private formArrayService: FormArrayService,
    private templateElementFormGroup: TemplateElementFormGroup,
    private activeRoute: ActivatedRoute,
    private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.mode = DialogMode.Edit;
        //todo wait fetch api
        this.fg = this.addTemplateFormGroup.getFormGroup();
      }
      else {
        this.fg = this.addTemplateFormGroup.getFormGroup();
      }
    })
  }

  onSave(): void {
    this.layoutService.closeRightSideNav();
  }


  onClose(): void {
    this.layoutService.closeRightSideNav();
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  onNewElementAdded() {
    const newElementFG = this.templateElementFormGroup.getFormGroup();
    this.formArrayService.addItemToFormArray('elements', this.fg, newElementFG);
  }

  isCreateMode() {
    return this.mode === DialogMode.Add;
  }

  isUpdateMode() {
    return this.mode === DialogMode.Edit;
  }
}
