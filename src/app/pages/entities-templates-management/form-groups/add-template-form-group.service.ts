import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AddTemplate } from '../models/add-template.model';
import { TemplateElementFormGroup } from './template-element-form-group.service';
import { TemplateElement } from '../models/template-element.model';
import { FormArrayService } from '@root/shared/services/form-array.service';

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
            id: new FormControl(item?.id || null),
            name: new FormControl(item?.name || null, [Validators.required]),
            elements: this.fb.array([]),
        });
        if (item?.elements) {
            item?.elements.forEach((elements: TemplateElement) =>
                this.formArrayService.getFormArrayItems('elements', this.fg).push(this.templateElementFormGroup.getFormGroup(elements))
            );
        }
        else {
            this.formArrayService.getFormArrayItems('elements', this.fg).push(this.templateElementFormGroup.getFormGroup({} as TemplateElement))
        }
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddTemplate {
        const template = {
            id: fg.controls.id?.value,
            name: fg.controls.name.value,
            elements: fg.controls.elements.value,
        };
        this.formArrayService.getFormArrayItems('elements', fg).controls.forEach((item: FormGroup) => {
            template.elements.push(this.templateElementFormGroup.getValueFromFormGroup(item));
        });
        return template;
    }
}
