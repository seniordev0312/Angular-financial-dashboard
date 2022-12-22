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
            avayaAPIKeyInformation: new FormControl(item?.avayaAPIKeyInformation || null, [Validators.required]),
            avayaAPISecretKey: new FormControl(item?.avayaAPISecretKey || null, [Validators.required]),

            twilioWhatsApp: new FormControl(item?.twilioWhatsApp || false, [Validators.required]),
            twilioWhatsAppAPIKeyInformation: new FormControl(item?.twilioWhatsAppAPIKeyInformation || null, [Validators.required]),
            twilioWhatsAppAPISecretKey: new FormControl(item?.twilioWhatsAppAPISecretKey || null, [Validators.required]),

            twilioSendGrid: new FormControl(item?.twilioSendGrid || false, [Validators.required]),
            twilioAPIKeyInformation: new FormControl(item?.twilioAPIKeyInformation || null, [Validators.required]),
            twilioAPISecretKey: new FormControl(item?.twilioAPISecretKey || null, [Validators.required]),

            SMSProxireach: new FormControl(item?.SMSProxireach || false, [Validators.required]),
            SMSProxireachAPIKeyInformation: new FormControl(item?.SMSProxireachAPIKeyInformation || null, [Validators.required]),
            SMSProxireachAPISecretKey: new FormControl(item?.SMSProxireachAPISecretKey || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): CompanySetup {
        return {
            address: fg.controls.address.value,
            email: fg.controls.email.value,
            website: fg.controls.website.value,
            phoneNumber: fg.controls.phoneNumber.value,

            avayaCentral: fg.controls.avayaCentral.value,
            avayaAPIKeyInformation: fg.controls.avayaAPIKeyInformation.value,
            avayaAPISecretKey: fg.controls.avayaAPISecretKey.value,

            twilioWhatsApp: fg.controls.twilioWhatsApp.value,
            twilioWhatsAppAPIKeyInformation: fg.controls.twilioWhatsAppAPIKeyInformation.value,
            twilioWhatsAppAPISecretKey: fg.controls.twilioWhatsAppAPISecretKey.value,

            twilioSendGrid: fg.controls.twilioSendGrid.value,
            twilioAPIKeyInformation: fg.controls.twilioAPIKeyInformation.value,
            twilioAPISecretKey: fg.controls.twilioAPISecretKey.value,

            SMSProxireach: fg.controls.SMSProxireach.value,
            SMSProxireachAPIKeyInformation: fg.controls.SMSProxireachAPIKeyInformation.value,
            SMSProxireachAPISecretKey: fg.controls.SMSProxireachAPISecretKey.value,
        };
    }
}
