import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { EntitiesMappingListItem } from '../models/entities-mapping-list-item.model';

@Injectable({
    providedIn: 'root',
})
export class EntityMappingFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: EntitiesMappingListItem): FormGroup {
        this.fg = this.fb.group({
            id: new FormControl(item?.id || null, [Validators.required]),
            externalField: new FormControl(item?.externalField || null, [Validators.required]),
            systemField: new FormControl(item?.systemField || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): EntitiesMappingListItem {
        return {
            id: fg.controls.id.value,
            externalField: fg.controls.externalField.value,
            systemField: fg.controls.systemField.value,
        };
    }
}
