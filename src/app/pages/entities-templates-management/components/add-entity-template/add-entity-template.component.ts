import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  constructor(private addTemplateFormGroup: AddTemplateFormGroup,
    private formArrayService: FormArrayService,
    private templateElementFormGroup: TemplateElementFormGroup,
    private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.fg = this.addTemplateFormGroup.getFormGroup();
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
}
