import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { CompanySetup } from '../models/company-setup.model';

@Injectable({
    providedIn: 'root',
})
export class CompanySetupFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: CompanySetup): FormGroup {
        this.fg = this.fb.group({
            address: new FormControl(item?.address || null, [Validators.required]),
            email: new FormControl(item?.email || null, [Validators.required]),
            website: new FormControl(item?.website || null, [Validators.required]),
            phoneNumber: new FormControl(item?.phoneNumber || null, [Validators.required]),
            avayaCentral: new FormControl(item?.avayaCentral || false, [Validators.required]),
            sMSProxireach: new FormControl(item?.sMSProxireach || false, [Validators.required]),
            twilioSendGrid: new FormControl(item?.twilioSendGrid || false, [Validators.required]),
            twilioWhatsApp: new FormControl(item?.twilioWhatsApp || false, [Validators.required]),
            aPIKeyInformation: new FormControl(item?.aPIKeyInformation || null, [Validators.required]),
            aPISecretKey: new FormControl(item?.aPISecretKey || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): CompanySetup {
        return {
            address: fg.controls.address.value,
            email: fg.controls.email.value,
            avayaCentral: fg.controls.avayaCentral.value,
            phoneNumber: fg.controls.phoneNumber.value,
            sMSProxireach: fg.controls.sMSProxireach.value,
            twilioSendGrid: fg.controls.twilioSendGrid.value,
            twilioWhatsApp: fg.controls.twilioWhatsApp.value,
            website: fg.controls.website.value,
            aPIKeyInformation: fg.controls.aPIKeyInformation.value,
            aPISecretKey: fg.controls.aPISecretKey.value,
        };
    }
}
