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
            description: new FormControl(),
            regularExpression: new FormControl(),
            indexable: new FormControl(),
            mandatory: new FormControl(),
            lockModifications: new FormControl(),
            searchable: new FormControl(),
            script: new FormControl(),
            validation: new FormControl(),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): ElementsListItem {
        return {
            elementType: fg.controls.elementType.value,
            elementName: fg.controls.elementName.value,
            description: fg.controls.description.value ?? '',
            regularExpression: fg.controls.regularExpression.value ?? '',
            indexable: fg.controls.indexable.value ?? false,
            searchable: fg.controls.searchable.value ?? false,
            mandatory: fg.controls.mandatory.value ?? false,
            lockModifications: fg.controls.lockModifications.value ?? false,
            validation: fg.controls.validation.value ?? false,
            script: fg.controls.script.value,
        };
    }
}
