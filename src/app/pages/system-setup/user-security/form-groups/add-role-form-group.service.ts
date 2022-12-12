import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AddRole } from '../models/add-role.model';

@Injectable({
    providedIn: 'root',
})
export class AddRoleFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: AddRole): FormGroup {
        this.fg = this.fb.group({
            id: new FormControl(item?.id || null, [Validators.required]),
            name: new FormControl(item?.name || null, [Validators.required]),
            module: new FormControl(item?.module || null, [Validators.required]),
            claims: new FormControl(item?.claims || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddRole {
        return {
            id: fg.controls.id.value,
            name: fg.controls.name.value,
            module: fg.controls.module.value,
            claims: fg.controls.claims.value,
        };
    }
}
