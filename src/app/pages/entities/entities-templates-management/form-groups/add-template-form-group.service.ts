import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AddTemplate } from '../models/add-template.model';
import { TemplateElementFormGroup } from './template-element-form-group.service';
import { FormArrayService } from '@root/shared/services/form-array.service';
import { TemplateElement } from '../models/template-elements-list-item.model';

@Injectable({
    providedIn: 'root',
})
export class AddTemplateFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder,
        private formArrayService: FormArrayService,
        private templateElementFormGroup: TemplateElementFormGroup) { }

    getFormGroup(item?: AddTemplate): FormGroup {
        this.fg = this.fb.group({
            entitySectionTemplateId: new FormControl(item?.entitySectionTemplateId || null),
            name: new FormControl(item?.name || null, [Validators.required]),
            fields: this.fb.array([]),
        });
        if (item?.fields) {
            item?.fields.forEach((elements: TemplateElement) =>
                this.formArrayService.getFormArrayItems('fields', this.fg).push(this.templateElementFormGroup.getFormGroup(elements))
            );
        }
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddTemplate {
        const template: AddTemplate = {
            entitySectionTemplateId: fg.controls.entitySectionTemplateId?.value,
            name: fg.controls.name.value,
            fields: []
        };
        this.formArrayService.getFormArrayItems('fields', fg).controls.forEach((item: FormGroup) => {
            template.fields.push(this.templateElementFormGroup.getValueFromFormGroup(item) as TemplateElement);
        });
        return template;
    }
}
