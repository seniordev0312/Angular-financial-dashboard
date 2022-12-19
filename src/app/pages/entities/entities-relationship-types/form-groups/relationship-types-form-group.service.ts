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
            entityTypeRelationshipId: new FormControl(item?.entityTypeRelationshipId || null),
            backward: new FormControl(item?.backward || null, [Validators.required]),
            forward: new FormControl(item?.forward || null, [Validators.required]),
            description: new FormControl(item?.description || null, [Validators.required]),
            allowedEntities: new FormControl(item?.allowedEntities || null, [Validators.required]),
            lock: new FormControl(item?.lock || false, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddRelationshipType {
        return {
            entityTypeRelationshipId: fg.controls.entityTypeRelationshipId.value,
            backward: fg.controls.backward.value,
            forward: fg.controls.forward.value,
            description: fg.controls.description.value,
            allowedEntities: fg.controls.allowedEntities.value,
            lock: fg.controls.lock.value
        };
    }
}
