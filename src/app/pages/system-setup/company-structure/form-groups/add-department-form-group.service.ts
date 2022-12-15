import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddDepartment } from '../models/add-department';
@Injectable({
    providedIn: 'root',
})
export class AddDepartmentFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: AddDepartment): FormGroup {
        this.fg = this.fb.group({
            name: new FormControl(item?.name || null, [Validators.required]),
            parentId: new FormControl(item?.parentId || null, [Validators.required]),
            level: new FormControl(item?.level || null, [Validators.required]),
            id: new FormControl(item?.id || null),
        });
        return this.fg;
    }
    setLevel(level: number) {
        this.fg.controls.level.setValue(level);
    }
    setParentId(parentId: number) {
        this.fg.controls.parentId.setValue(parentId);
    }
    setId(id: number) {
        this.fg.controls.id.setValue(id);
    }
    getValueFromFormGroup(fg: FormGroup): AddDepartment {
        return {
            name: fg.controls.name.value,
            parentId: fg.controls.parentId.value,
            level: fg.controls.level.value,
            id: fg.controls.id.value
        };
    }
}
