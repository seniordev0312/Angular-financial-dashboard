import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ElementsList } from '../models/element.model';

@Injectable({
    providedIn: 'root',
})
export class ElementFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: ElementsList): FormGroup {
        this.fg = this.fb.group({
            id: new FormControl(item?.id || null, [Validators.required]),
            template: new FormControl(item?.template || null, [Validators.required]),
            name: new FormControl(item?.name || null, [Validators.required]),
            description: new FormControl(item?.description || null, [Validators.required]),
            regex: new FormControl(item?.regex || null, [Validators.required]),
            isIndexable: new FormControl(item?.isIndexable || null, [Validators.required]),
            isMandatory: new FormControl(item?.isMandatory || null, [Validators.required]),
            isNotificationsLocked: new FormControl(item?.isNotificationsLocked || null, [Validators.required]),
            isSearchable: new FormControl(item?.isSearchable || null, [Validators.required]),
            hasValidation: new FormControl(item?.hasValidation || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): ElementsList {
        return {
            id: fg.controls.id.value,
            template: fg.controls.template.value,
            name: fg.controls.name.value,
            description: fg.controls.description.value,
            regex: fg.controls.regex.value,
            isSearchable: fg.controls.isSearchable.value,
            isIndexable: fg.controls.isIndexable.value,
            isMandatory: fg.controls.isMandatory.value,
            isNotificationsLocked: fg.controls.isNotificationsLocked.value,
            hasValidation: fg.controls.hasValidation.value,
        };
    }
}
