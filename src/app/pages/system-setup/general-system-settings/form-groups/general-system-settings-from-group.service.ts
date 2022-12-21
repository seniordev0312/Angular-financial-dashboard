import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { GeneralSystemSettings } from "../models/general-system-settings";

@Injectable({
    providedIn: 'root',
})
export class GeneralSystemSettingsFormGroup {

    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: GeneralSystemSettings): FormGroup {
        this.fg = this.fb.group({
            companyName: new FormControl(item?.companyName || null, [Validators.required]),
            accountingStyleCode: new FormControl(item?.accountingStyleCode || null, [Validators.required]),
            underwritingYear: new FormControl(item?.underwritingYear || 0, [Validators.required]),
            fiscalYear: new FormControl(item?.fiscalYear || 0, [Validators.required]),
            defaultCurrencyCode: new FormControl(item?.defaultCurrencyCode || null, [Validators.required]),
            countryCode: new FormControl(item?.countryCode || null, [Validators.required]),
            languageCode: new FormControl(item?.languageCode || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): GeneralSystemSettings {
        return {
            companyName: fg.controls.companyName.value,
            accountingStyleCode: fg.controls.accountingStyleCode.value,
            underwritingYear: fg.controls.underwritingYear.value,
            defaultCurrencyCode: fg.controls.defaultCurrencyCode.value,
            fiscalYear: fg.controls.fiscalYear.value,
            countryCode: fg.controls.countryCode.value,
            languageCode: fg.controls.languageCode.value,
        };
    }
}