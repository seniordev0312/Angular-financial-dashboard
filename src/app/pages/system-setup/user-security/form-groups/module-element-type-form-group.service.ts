import { Injectable } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";
import { FormArrayService } from "@root/shared/services/form-array.service";
import { ClaimElement } from "../models/claim-element.model";
import { ModuleElement } from "../models/module-element.model";
import { ClaimElementTypesFormGroup } from "./claim-elemet-form-group.service";


@Injectable({
    providedIn: 'root',
})
export class ModuleElementTypesFormGroup {
    fg: FormGroup;
    constructor(
        public fb: FormBuilder,
        private formArrayService: FormArrayService,
        private claimElementTypesFormGroup: ClaimElementTypesFormGroup
    ) { }

    getFormGroup(item?: ModuleElement): FormGroup {
        this.fg = this.fb.group({
            id: new FormControl(item?.id || null, [Validators.required]),
            name: new FormControl(item?.name || null, [Validators.required]),
            claims: this.fb.array([]),
        });

        if (item?.claims) {
            item?.claims.forEach((elements: ClaimElement) =>
                this.formArrayService.getFormArrayItems('claims', this.fg).push(this.claimElementTypesFormGroup.getFormGroup(elements))
            );
        }
        else {
            this.formArrayService.getFormArrayItems('claims', this.fg).push(this.claimElementTypesFormGroup.getFormGroup({} as ClaimElement))
        }
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): ModuleElement {
        const template = {
            id: fg.controls.id.value,
            name: fg.controls.name.value,
            claims: fg.controls.claims.value
        };

        this.formArrayService.getFormArrayItems('claims', fg).controls.forEach((item: FormGroup) => {
            template.claims.push(this.claimElementTypesFormGroup.getValueFromFormGroup(item));
        });
        return template;
    }
}