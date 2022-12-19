import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddRole } from '../models/add-role.model';
import { Claim } from '../models/claim.model';
import { ClaimFormGroup } from './claim-form-group.service';
import { FormArrayService } from '@root/shared/services/form-array.service';

@Injectable({
    providedIn: 'root',
})
export class AddRoleFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder,
        private claimFormGroup: ClaimFormGroup,
        private formArrayService: FormArrayService,
    ) { }

    getFormGroup(item?: AddRole): FormGroup {
        this.fg = this.fb.group({
            name: new FormControl(item?.roleName || null, [Validators.required]),
            claims: this.fb.array([]),
        });
        if (item?.claims) {
            item?.claims.forEach((elements: Claim) =>
                this.formArrayService.getFormArrayItems('claims', this.fg).push(this.claimFormGroup.getFormGroup(elements))
            );
        }
        return this.fg;
    }

    setClaims(claims: Claim[]) {
        this.formArrayService.getFormArrayItems('claims', this.fg).push(claims)
    }

    getValueFromFormGroup(fg: FormGroup): AddRole {
        const role: AddRole = {
            roleId: fg.controls.id.value,
            roleName: fg.controls.name.value,
            claims: []
        };
        this.formArrayService.getFormArrayItems('claims', fg).controls.forEach((item: FormGroup) => {
            role.claims.push(this.claimFormGroup.getValueFromFormGroup(item) as Claim);
        });
        return role;
    }
}
