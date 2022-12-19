import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AddEntitiesSource } from '../models/add-entity-source.model';

@Injectable({
    providedIn: 'root',
})
export class EntitySourceTypeFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: AddEntitiesSource): FormGroup {
        this.fg = this.fb.group({
            entitySourceId: new FormControl(item?.entitySourceId || null),
            sourceName: new FormControl(item?.sourceName || null, [Validators.required]),
            isLockModification: new FormControl(item?.isLockModification || false, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddEntitiesSource {
        return {
            entitySourceId: fg.controls.entitySourceId.value,
            sourceName: fg.controls.sourceName.value,
            isLockModification: fg.controls.isLockModification.value
        };
    }
}
