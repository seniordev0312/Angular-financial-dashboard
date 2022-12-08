import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { UserSecurity } from "../models/user-security.model";

@Injectable({
    providedIn: 'root',
})
export class UserSecurityFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: UserSecurity): FormGroup {
        this.fg = this.fb.group({
            forceComplexPasswords: new FormControl(item?.forceComplexPasswords || null, [Validators.required]),
            forceChangePassword: new FormControl(item?.forceChangePassword || null, [Validators.required]),
            minimumPasswordLength: new FormControl(item?.minimumPasswordLength || null, [Validators.required]),
            maximumTrailsBeforeLocking: new FormControl(item?.maximumTrailsBeforeLocking || null, [Validators.required]),
            everyXDays: new FormControl(item?.everyXDays || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): UserSecurity {
        return {
            forceComplexPasswords: fg.controls.forceComplexPasswords.value,
            forceChangePassword: fg.controls.forceChangePassword.value,
            minimumPasswordLength: fg.controls.minimumPasswordLength.value,
            maximumTrailsBeforeLocking: fg.controls.maximumTrailsBeforeLocking.value,
            everyXDays: fg.controls.everyXDays.value,
        };
    }
}