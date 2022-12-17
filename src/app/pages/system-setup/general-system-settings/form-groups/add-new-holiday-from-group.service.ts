import { Injectable } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Holiday } from "../models/holiday.model";

@Injectable({
    providedIn: 'root',
})
export class AddNewHolidayFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder) { }
    getFormGroup(item?: Holiday): FormGroup {
        this.fg = this.fb.group({
            endDate: new FormControl(item?.endDate || null, [Validators.required]),
            startDate: new FormControl(item?.startDate || null, [Validators.required]),
            name: new FormControl(item?.name || null, [Validators.required]),
            offDay: new FormControl(item?.offDay || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): Holiday {
        return {
            endDate: fg.controls.endDate.value,
            startDate: fg.controls.startDate.value,
            name: fg.controls.name.value,
            offDay: fg.controls.offDay.value,
        };
    }
}