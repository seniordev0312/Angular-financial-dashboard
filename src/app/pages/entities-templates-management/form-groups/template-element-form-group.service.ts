import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { TemplateElement } from '../models/template-element.model';

@Injectable({
    providedIn: 'root',
})
export class TemplateElementTypesFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: TemplateElement): FormGroup {
        this.fg = this.fb.group({
            types: new FormControl(item?.types || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): TemplateElement {
        return {
            types: fg.controls.types.value,
        };
    }
}
