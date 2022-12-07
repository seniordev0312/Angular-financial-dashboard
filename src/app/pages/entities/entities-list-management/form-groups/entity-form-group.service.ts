import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AddEntity } from '../models/add-entity.model';

@Injectable({
    providedIn: 'root',
})
export class EntityFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: AddEntity): FormGroup {
        this.fg = this.fb.group({
            id: new FormControl(item?.id || null, [Validators.required]),
            code: new FormControl(item?.code || null, [Validators.required]),
            name: new FormControl(item?.name || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddEntity {
        return {
            id: fg.controls.id.value,
            code: fg.controls.code.value,
            name: fg.controls.name.value,
        };
    }
}
