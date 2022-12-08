import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { RoleElement } from "../models/role-element.model";

@Injectable({
    providedIn: 'root',
})
export class RoleElementTypesFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: RoleElement): FormGroup {
        this.fg = this.fb.group({
            types: new FormControl(item?.types || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): RoleElement {
        return {
            types: fg.controls.types.value,
        };
    }
}