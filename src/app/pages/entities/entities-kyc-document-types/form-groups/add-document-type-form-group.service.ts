import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AddDocumentType } from '../models/add-document-type.model';

@Injectable({
    providedIn: 'root',
})
export class DocumentTypeFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: AddDocumentType): FormGroup {
        this.fg = this.fb.group({
            kycDocumentType: new FormControl(item?.kycDocumentType || null, [Validators.required]),
            isActive: new FormControl(item?.isActive || false, [Validators.required]),
            templateProcessingKeyInformation: new FormControl(item?.templateProcessingKeyInformation || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddDocumentType {
        return {
            kycDocumentType: fg.controls.kycDocumentType.value,
            isActive: fg.controls.isActive.value,
            templateProcessingKeyInformation: fg.controls.templateProcessingKeyInformation.value,
        };
    }
}
