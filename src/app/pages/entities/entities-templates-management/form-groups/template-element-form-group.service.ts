import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { TemplateElement } from '../models/template-elements-list-item.model';

@Injectable({
    providedIn: 'root',
})
export class TemplateElementFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: TemplateElement): FormGroup {
        this.fg = this.fb.group({
            elementName: new FormControl(item?.elementName || null, [Validators.required]),
            elementType: new FormControl(item?.elementType, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): TemplateElement {
        return {
            elementName: fg.controls.elementName.value,
            elementType: fg.controls.elementType.value,
        };
    }
}
