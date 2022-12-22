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
            isOffDay: new FormControl(item?.isOffDay || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): Holiday {
        return {
            endDate: new Date(fg.controls.endDate.value).toLocaleDateString('en-GB'),
            startDate: new Date(fg.controls.startDate.value).toLocaleDateString('en-GB'),
            name: fg.controls.name.value,
            isOffDay: fg.controls.isOffDay.value,
        };
    }
}