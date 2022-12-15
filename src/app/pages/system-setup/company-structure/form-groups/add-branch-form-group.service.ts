import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddBranch } from '../models/add-branch.model';
@Injectable({
    providedIn: 'root',
})
export class AddBranchFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: AddBranch): FormGroup {
        this.fg = this.fb.group({
            name: new FormControl(item?.name || null, [Validators.required]),
            level: new FormControl(item?.level || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddBranch {
        return {
            name: fg.controls.name.value,
            level: fg.controls.level.value,
        };
    }
}
