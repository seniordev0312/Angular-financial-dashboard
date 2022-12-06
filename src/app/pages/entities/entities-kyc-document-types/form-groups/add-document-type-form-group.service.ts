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
            id: new FormControl(item?.id || null, [Validators.required]),
            code: new FormControl(item?.code || null, [Validators.required]),
            type: new FormControl(item?.type || null, [Validators.required]),
            process: new FormControl(item?.process || null, [Validators.required]),
            processingKey: new FormControl(item?.processingKey || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddDocumentType {
        return {
            id: fg.controls.id.value,
            code: fg.controls.code.value,
            type: fg.controls.type.value,
            process: fg.controls.process.value,
            processingKey: fg.controls.processingKey.value,
        };
    }
}
