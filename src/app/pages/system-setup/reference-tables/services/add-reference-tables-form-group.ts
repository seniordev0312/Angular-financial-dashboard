import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ReferenceTables } from '../model/reference-tables.model';

@Injectable({
    providedIn: 'root',
})
export class AddReferenceTablesFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: ReferenceTables): FormGroup {
        this.fg = this.fb.group({
            code: new FormControl(item?.code || null, [Validators.required]),
            key: new FormControl(item?.key || null, [Validators.required]),
            value: new FormControl(item?.value || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): ReferenceTables {
        return {
            code: fg.controls.elementType.value,
            key: fg.controls.elementName.value,
            value: fg.controls.description.value,
        };
    }
}
