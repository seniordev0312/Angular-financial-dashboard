import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormArrayService } from '@root/shared/services/form-array.service';

import { AddRole } from '../models/add-role.model';
import { RoleElement } from '../models/role-element.model';
import { RoleElementTypesFormGroup } from './role-element-type-form-group.service';

@Injectable({
    providedIn: 'root',
})
export class AddUserRoleFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder,
        private formArrayService: FormArrayService,
        private roleElementTypesFormGroup: RoleElementTypesFormGroup) { }

    getFormGroup(item?: AddRole): FormGroup {
        this.fg = this.fb.group({
            id: new FormControl(item?.id || null),
            name: new FormControl(item?.name || null, [Validators.required]),
            elementName: new FormControl(item?.elementName || null, [Validators.required]),
            elementTypes: this.fb.array([]),
        });
        if (item?.elementTypes) {
            item?.elementTypes.forEach((elements: RoleElement) =>
                this.formArrayService.getFormArrayItems('elementTypes', this.fg).push(this.roleElementTypesFormGroup.getFormGroup(elements))
            );
        }
        else {
            this.formArrayService.getFormArrayItems('elementTypes', this.fg).push(this.roleElementTypesFormGroup.getFormGroup({} as RoleElement))
        }
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddRole {
        const template = {
            id: fg.controls.id?.value,
            name: fg.controls.name.value,
            elementName: fg.controls.elementName.value,
            elementTypes: fg.controls.elements.value,
        };
        this.formArrayService.getFormArrayItems('elementTypes', fg).controls.forEach((item: FormGroup) => {
            template.elementTypes.push(this.roleElementTypesFormGroup.getValueFromFormGroup(item));
        });
        return template;
    }
}