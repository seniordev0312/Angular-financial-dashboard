import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AddChartOfAccounts } from '../models/add-chart-of-account.model';

@Injectable({
    providedIn: 'root',
})
export class AddChartOfAccountFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: AddChartOfAccounts): FormGroup {
        this.fg = this.fb.group({
            id: new FormControl(item?.id || null),
            companyName: new FormControl(item?.companyName || null, [Validators.required]),
            parentAccount: new FormControl(item?.parentAccount || null, [Validators.required]),
            defaultCurrency: new FormControl(item?.defaultCurrency || null, [Validators.required]),
            description: new FormControl(item?.description || null, [Validators.required]),
            isNewGroup: new FormControl(item?.isNewGroup || null, [Validators.required]),
            ledgerNumber: new FormControl(item?.ledgerNumber || null, [Validators.required]),
            accountType: new FormControl(item?.accountType || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddChartOfAccounts {
        return {
            id: fg.controls.id?.value,
            companyName: fg.controls.companyName.value,
            ledgerNumber: fg.controls.ledgerNumber.value,
            description: fg.controls.description.value,
            isNewGroup: fg.controls.isNewGroup.value,
            parentAccount: fg.controls.parentAccount.value,
            defaultCurrency: fg.controls.defaultCurrency.value,
            accountType: fg.controls.accountType.value,
        }
    }
}
