import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AddTemplate } from '../models/add-template.model';

@Injectable({
    providedIn: 'root',
})
export class AddTemplateFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: AddTemplate): FormGroup {
        this.fg = this.fb.group({
            id: new FormControl({
                value: item?.id || null, disabled: true
            }),
            name: new FormControl(item?.name || null, [Validators.required]),
            elementName: new FormControl(item?.elementName || null, [Validators.required]),
            elementTypes: new FormControl(item?.elementTypes || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddTemplate {
        const template = {
            id: fg.controls.id?.value,
            name: fg.controls.name.value,
            elementName: fg.controls.elementName.value,
            elementTypes: fg.controls.elements.value,
        };
        return template;
    }
}
