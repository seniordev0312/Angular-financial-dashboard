import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AddEntityMapping } from '../models/add-entity-mapping.model';

@Injectable({
    providedIn: 'root',
})
export class EntityMappingFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: AddEntityMapping): FormGroup {
        this.fg = this.fb.group({
            fieldId: new FormControl(item?.fieldId || null),
            externalField: new FormControl(item?.externalField || null, [Validators.required]),
            systemField: new FormControl(item?.systemField || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddEntityMapping {
        return {
            fieldId: fg.controls.fieldId.value,
            externalField: fg.controls.externalField.value,
            systemField: fg.controls.systemField.value,
        };
    }
}
