import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AddGroup } from '../models/add-group.model';

@Injectable({
    providedIn: 'root',
})
export class AddGroupFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: AddGroup): FormGroup {
        this.fg = this.fb.group({
            name: new FormControl(item?.name || null, [Validators.required]),
            parentId: new FormControl(item?.parentId || null, [Validators.required]),
            id: new FormControl(item?.id || null),
        });
        return this.fg;
    }
    setParentId(parentId: number) {
        this.fg.controls.parentId.setValue(parentId);
    }
    setId(id: number) {
        this.fg.controls.id.setValue(id);
    }
    getValueFromFormGroup(fg: FormGroup): AddGroup {
        return {
            name: fg.controls.name.value,
            parentId: fg.controls.parentId.value,
            id: fg.controls.id.value
        };
    }
}