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
            type: new FormControl(item?.type || null, [Validators.required]),
            value: new FormControl(item?.value || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): ClaimElement {
        return {
            id: fg.controls.id.value,
            type: fg.controls.type.value,
            value: fg.controls.value.value,
        };
    }
}