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
            id: new FormControl(item?.claimType || null, [Validators.required]),
            totalCount: new FormControl(item?.totalCount || null, [Validators.required]),
            clientClaims: this.fb.array([]),
        });
        if (item?.clientClaims) {
            item?.clientClaims.forEach((elements: ClaimElement) =>
                this.formArrayService.getFormArrayItems('clientClaims', this.fg).push(this.claimElementTypesFormGroup.getFormGroup(elements))
            );
        }
        else {
            this.formArrayService.getFormArrayItems('clientClaims', this.fg).push(this.claimElementTypesFormGroup.getFormGroup({} as ClaimElement))
        }
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): ModuleElement {
        const template = {
            claimType: fg.controls.claimType.value,
            totalCount: fg.controls.totalCount.value,
            clientClaims: fg.controls.clientClaims.value,
            value: fg.controls.value.value
        };

        this.formArrayService.getFormArrayItems('clientClaims', fg).controls.forEach((item: FormGroup) => {
            template.clientClaims.push(this.claimElementTypesFormGroup.getValueFromFormGroup(item));
        });
        return template;
    }
}