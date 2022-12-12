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
            id: new FormControl(item?.id || null, [Validators.required]),
            externalField: new FormControl(item?.externalField || null, [Validators.required]),
            systemField: new FormControl(item?.systemField || null, [Validators.required]),
            entityType: new FormControl(item?.entityType || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddEntityMapping {
        return {
            id: fg.controls.id.value,
            externalField: fg.controls.externalField.value,
            systemField: fg.controls.systemField.value,
            entityType: fg.controls.entityType.value,
        };
    }
}
