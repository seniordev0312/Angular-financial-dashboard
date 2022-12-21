import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AccountDetails } from '../models/account-details.model';
import { AddAccount } from '../models/add-account.model';

@Injectable({
    providedIn: 'root',
})
export class AddChartOfAccountFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: AccountDetails): FormGroup {
        this.fg = this.fb.group({
            accountId: new FormControl(item?.accountId || 0),
            accountTypeId: new FormControl(item?.accountTypeId || 0),
            companyName: new FormControl(item?.companyName || null),
            parentAccountTypeId: new FormControl(item?.parentAccountTypeId || 0, [Validators.required]),
            currencyId: new FormControl(item?.currencyId || null, [Validators.required]),
            name: new FormControl(item?.name || null, [Validators.required]),
            isNewGroup: new FormControl(item?.isNewGroup || true, [Validators.required]),
            code: new FormControl(item?.code || null, [Validators.required]),
            accountType: new FormControl(item?.accountType || 0, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddAccount {
        return {
            accountId: fg.controls.accountId?.value,
            accountCode: fg.controls.code.value,
            accountName: fg.controls.name.value,
            parentAccountTypeId: fg.controls.parentAccountTypeId.value,
            currencyId: fg.controls.currencyId.value,
            accountTypeId: fg.controls.accountTypeId.value,
        }
    }
}
