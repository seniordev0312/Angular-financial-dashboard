import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AddRelationshipType } from '../models/add-relationship-type.model';

@Injectable({
    providedIn: 'root',
})
export class RelationshipTypesFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: AddRelationshipType): FormGroup {
        this.fg = this.fb.group({
            code: new FormControl(item?.code || null, [Validators.required]),
            back: new FormControl(item?.back || null, [Validators.required]),
            forward: new FormControl(item?.forward || null, [Validators.required]),
            description: new FormControl(item?.description || null, [Validators.required]),
            allowedEntities: new FormControl(item?.allowedEntities || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddRelationshipType {
        return {
            code: fg.controls.code.value,
            back: fg.controls.back.value,
            forward: fg.controls.forward.value,
            description: fg.controls.description.value,
            allowedEntities: fg.controls.allowedEntities.value,
        };
    }
}
