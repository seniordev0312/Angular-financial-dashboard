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
            accountingStyle: new FormControl(item?.accountingStyle || null, [Validators.required]),
            country: new FormControl(item?.country || null, [Validators.required]),
            defaultCurrency: new FormControl(item?.defaultCurrency || null, [Validators.required]),
            defaultLanguage: new FormControl(item?.defaultLanguage || null, [Validators.required]),
            fiscalYear: new FormControl(item?.fiscalYear || null, [Validators.required]),
            underwritingYear: new FormControl(item?.underwritingYear || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): GeneralSystemSettings {
        return {
            companyName: fg.controls.companyName.value,
            accountingStyle: fg.controls.accountingStyle.value,
            country: fg.controls.country.value,
            defaultCurrency: fg.controls.defaultCurrency.value,
            defaultLanguage: fg.controls.defaultLanguage.value,
            fiscalYear: fg.controls.fiscalYear.value,
            underwritingYear: fg.controls.underwritingYear.value,
        };
    }
}