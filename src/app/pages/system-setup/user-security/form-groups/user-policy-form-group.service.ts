import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { UserPolicy } from '../models/user-policy.model';

@Injectable({
    providedIn: 'root',
})
export class UserPolicyFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: UserPolicy): FormGroup {
        this.fg = this.fb.group({
            isComplexPasswordForced: new FormControl(item?.isComplexPasswordForced || false, [Validators.required]),
            isChangePasswordForced: new FormControl(item?.isChangePasswordForced || false, [Validators.required]),
            minPasswordLength: new FormControl(item?.minPasswordLength || 0, [Validators.required]),
            maxTrialsBeforeLockingLength: new FormControl(item?.maxTrialsBeforeLockingLength || 0, [Validators.required]),
            numberOfDays: new FormControl(item?.numberOfDays || 0, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): UserPolicy {
        return {
            isComplexPasswordForced: fg.controls.isComplexPasswordForced.value,
            isChangePasswordForced: fg.controls.isChangePasswordForced.value,
            minPasswordLength: fg.controls.minPasswordLength.value,
            maxTrialsBeforeLockingLength: fg.controls.maxTrialsBeforeLockingLength.value,
            numberOfDays: fg.controls.numberOfDays.value
        };
    }
}
