import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Claim } from '../models/claim.model';

@Injectable({
    providedIn: 'root',
})
export class ClaimFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: Claim): FormGroup {
        this.fg = this.fb.group({
            claimId: new FormControl(item?.claimId || null),
            claimType: new FormControl(item?.claimType || null, [Validators.required]),
            claimValue: new FormControl(item?.claimValue || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): Claim {
        return {
            claimId: fg.controls.claimId.value,
            claimType: fg.controls.claimType.value,
            claimValue: fg.controls.claimValue.value,
        };
    }
}
