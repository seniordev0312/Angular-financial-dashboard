import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class SingleSelectFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(): FormGroup {
        this.fg = this.fb.group({
            option: {},
            search: "",
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): any {
        return {
            option: fg.controls.option.value,
            search: fg.controls.search.value,
        };
    }
}
