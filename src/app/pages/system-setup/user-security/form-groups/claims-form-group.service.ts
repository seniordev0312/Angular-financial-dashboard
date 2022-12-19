import { Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { AddClaim } from '../models/add-claim.model';

@Injectable({
    providedIn: 'root',
})
export class ClaimsFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: AddClaim[]): FormGroup {
        this.fg = this.fb.group({
            claims: [item ? item : []]
        });
        return this.fg;
    }

    get claims() {
        return this.fg.controls['claims'] as FormArray;
    }

    addClaim(claim: AddClaim) {
        this.fg.controls['claims'].setValue([...this.claims.value, claim])
        this.fg.controls['claims'].updateValueAndValidity();
    }

    getValueFromFormGroup(fg: FormGroup): any {
        return {
            claims: fg.controls.claims.value,
        };
    }
}