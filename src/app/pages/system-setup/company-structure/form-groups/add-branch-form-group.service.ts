import { Injectable } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AddBranch } from '../models/add-branch.model';
@Injectable({
    providedIn: 'root',
})
export class AddBranchFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: AddBranch): FormGroup {
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
    getValueFromFormGroup(fg: FormGroup): AddBranch {
        return {
            name: fg.controls.name.value,
            parentId: fg.controls.parentId.value,
            id: fg.controls.id.value
        };
    }
}
