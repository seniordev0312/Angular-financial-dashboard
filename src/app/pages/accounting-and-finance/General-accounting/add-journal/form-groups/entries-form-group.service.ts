import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Injectable } from '@angular/core';
//import { MobileValidator } from './mobile-number-validator';
//import { AppRepository } from '@root/app.repository';
@Injectable({
  providedIn: 'root',
})
export class EntriesFormGroup {
  fg: FormGroup;
  countryCode: string;
  constructor(
    private fb: FormBuilder,
  ) {
  }
  getFormGroup(): FormGroup {
    return this.fb.group({
      debit: new FormControl(null, [
        Validators.required,
      ]),
      credit: new FormControl(null, [
        Validators.required,
      ]),
      ein: new FormControl(null, [
        Validators.required,
      ]),
      description: new FormControl(null, [
        Validators.minLength(1)
      ]),
    });
  }

  getValueFromFormGroup(fg: FormGroup) {
    return {
      debit: fg.controls.debit.value,
      credit: fg.controls.credit.value,
      ein: fg.controls.ein.value,
      description: fg.controls.description.value ?? '',
    };
  }
}
