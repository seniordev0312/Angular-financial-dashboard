import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormArrayService } from '@root/shared/services/form-array.service';

import { AddRole } from '../models/add-role.model';
import { ModuleElement } from '../models/module-element.model';
import { ModuleElementTypesFormGroup } from './module-element-type-form-group.service';

@Injectable({
    providedIn: 'root',
})
export class AddUserRoleFormGroup {
    fg: FormGroup;
    constructor(
        public fb: FormBuilder,
        private formArrayService: FormArrayService,
        private moduleElementTypesFormGroup: ModuleElementTypesFormGroup
    ) { }

    getFormGroup(item?: AddRole): FormGroup {
        this.fg = this.fb.group({
            modules: this.fb.array([]),
        });
        if (item?.modules) {
            item?.modules.forEach((elements: ModuleElement) =>
                this.formArrayService.getFormArrayItems('modules', this.fg).push(this.moduleElementTypesFormGroup.getFormGroup(elements))
            );
        }
        else {
            this.formArrayService.getFormArrayItems('modules', this.fg).push(this.moduleElementTypesFormGroup.getFormGroup({} as ModuleElement))
        }
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddRole {
        const template = {
            modules: fg.controls.modules.value,
        };
        this.formArrayService.getFormArrayItems('modules', fg).controls.forEach((item: FormGroup) => {
            template.modules.push(this.moduleElementTypesFormGroup.getValueFromFormGroup(item));
        });
        return template;
    }
    setValue(modules: any[]) {
        // this.selectSearchForm.get("SelectControl").setValue(value.value);
        this.fg.get('modules').setValue(modules);
    }
}