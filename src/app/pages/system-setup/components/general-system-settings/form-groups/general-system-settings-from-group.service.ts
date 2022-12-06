import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { AddEntitiesSource } from "@root/pages/entities/entities-sources-management/models/add-entity-source.model";

@Injectable({
    providedIn: 'root',
})
export class GeneralSystemSettingsFormGroup {

    fg: FormGroup;
    constructor(public fb: FormBuilder) { }

    getFormGroup(item?: AddEntitiesSource): FormGroup {
        this.fg = this.fb.group({
            id: new FormControl(item?.id || null, [Validators.required]),
            name: new FormControl(item?.name || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddEntitiesSource {
        return {
            id: fg.controls.id.value,
            name: fg.controls.name.value,
        };
    }
}