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
export class JournalFormGroup {
  fg: FormGroup;
  countryCode: string;
  constructor(
    private fb: FormBuilder,
  ) {
  }
  getFormGroup(): FormGroup {
    return this.fb.group({
      entryType: new FormControl(null, [
        Validators.required,
      ]),
      journalId: new FormControl(null, [
        Validators.required,
      ]),
      description: new FormControl(null, [
      ]),
      currencyId: new FormControl(null, [
        Validators.required,
      ]),
      entryDate: new FormControl(null, [
        Validators.required,
      ]),
      postDate: new FormControl(null, [
        Validators.required,
      ]),
      dueDate: new FormControl(null, [
        Validators.required,
      ]),
      ein: new FormControl(null, [
        Validators.required,
      ]),
    });
  }

  getValueFromFormGroup(fg: FormGroup) {
    console.log(fg)
    return {
      entryType: fg.controls.entryType.value,
      journalId: fg.controls.journalId.value,
      description: fg.controls.description.value,
      currencyId: fg.controls.currencyId.value,
      entryDate: fg.controls.entryDate.value,
      postDate: fg.controls.postDate.value,
      dueDate: fg.controls.dueDate.value,
      ein: fg.controls.ein.value,
    };
  }
}
