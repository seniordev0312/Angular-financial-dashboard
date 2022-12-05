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
            id: new FormControl(item?.id || null, [Validators.required]),
            name: new FormControl(item?.name || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddEntitiesSource {
        return {
            id: fg.controls.id.value,
            name: fg.controls.name.value,
        };
    }
}
