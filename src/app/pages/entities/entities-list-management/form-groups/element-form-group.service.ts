import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { ElementsListItem } from '../models/element-list-item.model';

@Injectable({
    providedIn: 'root',
})
export class ElementFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: ElementsListItem): FormGroup {
        this.fg = this.fb.group({
            elementType: new FormControl(item?.elementType || null, [Validators.required]),
            elementName: new FormControl(item?.elementName || null, [Validators.required]),
            description: new FormControl(item?.description || null, [Validators.required]),
            regularExpression: new FormControl(item?.regularExpression || null, [Validators.required]),
            indexable: new FormControl(item?.indexable || false, [Validators.required]),
            mandatory: new FormControl(item?.mandatory || false, [Validators.required]),
            lockModifications: new FormControl(item?.lockModifications || false, [Validators.required]),
            searchable: new FormControl(item?.searchable || false, [Validators.required]),
            validation: new FormControl(item?.validation || false, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): ElementsListItem {
        return {
            elementType: fg.controls.elementType.value,
            elementName: fg.controls.elementName.value,
            description: fg.controls.description.value,
            regularExpression: fg.controls.regularExpression.value,
            indexable: fg.controls.indexable.value,
            searchable: fg.controls.searchable.value,
            mandatory: fg.controls.mandatory.value,
            lockModifications: fg.controls.lockModifications.value,
            validation: fg.controls.validation.value,
        };
    }
}
