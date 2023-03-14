import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ContactDetails } from '../models/contact-details.model';

@Injectable({
  providedIn: 'root',
})
export class ContactDetailsService {
  fg: FormGroup;

  isFormValid: boolean = false;
  constructor(public fb: FormBuilder) {}

  getFormGroup(item?: ContactDetails): FormGroup {
    this.fg = this.fb.group({
      name: new FormControl(item?.name || null, [Validators.required]),
      entityCode: new FormControl(item?.entityCode || null, [
        Validators.required,
      ]),
      common: new FormControl(item?.common || null, [Validators.required]),
      basicInformation: new FormControl(item?.basicInformation || null, [
        Validators.required,
      ]),
      address: new FormControl(item?.address || null, [Validators.required]),
    });

    return this.fg;
  }

  setParentId(parentId: number) {
    this.fg.controls.parentId.setValue(parentId);
  }
  setId(id: number) {
    this.fg.controls.id.setValue(id);
  }

  getValueFromFormGroup(fg: FormGroup): ContactDetails {
    return {
      name: fg.controls.name.value,
      entityCode: fg.controls.name.value,
      common: fg.controls.name.value,
      basicInformation: fg.controls.name.value,
      address: fg.controls.name.value,
    };
  }

  checkFormValidity() {
    if (this.fg.valid) {
      this.isFormValid = true;
    } else {
      this.isFormValid = false;
    }
  }

  onSave() {
    if (!this.isFormValid) return;
  }
}
