import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
    providedIn: 'root',
})
export class MultiSelectFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(): FormGroup {
        this.fg = this.fb.group({
            options: []
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): any {
        return {
            options: fg.controls.options.value,
        };
    }
}
