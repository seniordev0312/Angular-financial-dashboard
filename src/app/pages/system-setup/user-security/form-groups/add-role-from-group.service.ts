import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddRole } from '../models/add-role.model';

@Injectable({
    providedIn: 'root',
})
export class AddRoleFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: AddRole): FormGroup {
        this.fg = this.fb.group({
            name: new FormControl(item?.name || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddRole {
        return {
            name: fg.controls.name.value,
        };
    }
}
