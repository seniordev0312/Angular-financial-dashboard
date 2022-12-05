import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AddTemplate } from '../models/add-template.model';
import { TemplateElementTypesFormGroup } from './template-element-form-group.service';
import { TemplateElement } from '../models/template-element.model';
import { FormArrayService } from '@root/shared/services/form-array.service';

@Injectable({
    providedIn: 'root',
})
export class AddTemplateFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder,
        private formArrayService: FormArrayService,
        private templateElementTypesFormGroup: TemplateElementTypesFormGroup) { }

    getFormGroup(item?: AddTemplate): FormGroup {
        this.fg = this.fb.group({
            id: new FormControl(item?.id || null),
            name: new FormControl(item?.name || null, [Validators.required]),
            elementName: new FormControl(item?.elementName || null, [Validators.required]),
            elementTypes: this.fb.array([]),
        });
        if (item?.elementTypes) {
            item?.elementTypes.forEach((elements: TemplateElement) =>
                this.formArrayService.getFormArrayItems('elementTypes', this.fg).push(this.templateElementTypesFormGroup.getFormGroup(elements))
            );
        }
        else {
            this.formArrayService.getFormArrayItems('elementTypes', this.fg).push(this.templateElementTypesFormGroup.getFormGroup({} as TemplateElement))
        }
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddTemplate {
        const template = {
            id: fg.controls.id?.value,
            name: fg.controls.name.value,
            elementName: fg.controls.elementName.value,
            elementTypes: fg.controls.elements.value,
        };
        this.formArrayService.getFormArrayItems('elementTypes', fg).controls.forEach((item: FormGroup) => {
            template.elementTypes.push(this.templateElementTypesFormGroup.getValueFromFormGroup(item));
        });
        return template;
    }
}
