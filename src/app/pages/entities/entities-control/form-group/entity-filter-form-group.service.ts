import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { EntityFilter } from '../models/entity-filter.model';

@Injectable({
    providedIn: 'root',
})
export class EntityFilterFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: EntityFilter): FormGroup {
        this.fg = this.fb.group({
            name: new FormControl(item?.name || null, [Validators.required]),
            type: new FormControl(item?.type || null, [Validators.required]),
            location: new FormControl(item?.location || null, [Validators.required]),
            einNumber: new FormControl(item?.einNumber || null, [Validators.required]),
            source: new FormControl(item?.source || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): EntityFilter {
        return {
            source: fg.controls.source.value,
            einNumber: fg.controls.einNumber.value,
            name: fg.controls.name.value,
            type: fg.controls.type.value,
            location: fg.controls.location.value,
        };
    }
}
