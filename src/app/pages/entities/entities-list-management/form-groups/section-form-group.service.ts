import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AddSection } from '../models/add-section.model';

@Injectable({
    providedIn: 'root',
})
export class SectionFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: AddSection): FormGroup {
        this.fg = this.fb.group({
            id: new FormControl(item?.id || null, [Validators.required]),
            template: new FormControl(item?.template || null, [Validators.required]),
            name: new FormControl(item?.name || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddSection {
        return {
            id: fg.controls.id.value,
            template: fg.controls.template.value,
            name: fg.controls.name.value,
        };
    }
}
