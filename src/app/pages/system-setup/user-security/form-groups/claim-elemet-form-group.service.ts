import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { ClaimElement } from "../models/claim-element.model";


@Injectable({
    providedIn: 'root',
})
export class ClaimElementTypesFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: ClaimElement): FormGroup {
        this.fg = this.fb.group({
            id: new FormControl(item?.id || null, [Validators.required]),
            name: new FormControl(item?.name || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): ClaimElement {
        return {
            id: fg.controls.id.value,
            name: fg.controls.name.value,
        };
    }
}