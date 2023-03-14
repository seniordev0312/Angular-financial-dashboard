import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PolicyInformation } from '../models/policy-information.model';

@Injectable({
  providedIn: 'root',
})
export class PolicyInformationService {
  fg: FormGroup;
  constructor(public fb: FormBuilder) {}

  getFormGroup(item?: PolicyInformation): FormGroup {
    this.fg = this.fb.group({
      dateIssued: new FormControl(item?.dateIssued || null, [
        Validators.required,
      ]),
      policyNumber: new FormControl(item?.policyNumber || null, [
        Validators.required,
      ]),
      insuranceProduct: new FormControl(item?.insuranceProduct || null, [
        Validators.required,
      ]),
      totalCharges: new FormControl(item?.totalCharges || null, [
        Validators.required,
      ]),
      totalOpenClaims: new FormControl(item?.totalOpenClaims || null, [
        Validators.required,
      ]),
      premium: new FormControl(item?.premium || null, [Validators.required]),
      pendingDues: new FormControl(item?.pendingDues || null, [
        Validators.required,
      ]),
      paymentHistory: new FormControl(item?.paymentHistory || null, [
        Validators.required,
      ]),
      parentId: new FormControl(item?.parentId || null, [Validators.required]),
      id: new FormControl(item?.id || null),
    });

    return this.fg;
  }

  setParentId(parentId: number) {
    this.fg.controls.parentId.setValue(parentId);
  }
  setId(id: number) {
    this.fg.controls.id.setValue(id);
  }
  getValueFromFormGroup(fg: FormGroup): PolicyInformation {
    return {
      dateIssued: fg.controls.name.value,
      policyNumber: fg.controls.name.value,
      insuranceProduct: fg.controls.name.value,
      totalCharges: fg.controls.name.value,
      totalOpenClaims: fg.controls.name.value,
      premium: fg.controls.name.value,
      pendingDues: fg.controls.name.value,
      paymentHistory: fg.controls.name.value,
      parentId: fg.controls.parentId.value,
      id: fg.controls.id.value,
    };
  }
}
