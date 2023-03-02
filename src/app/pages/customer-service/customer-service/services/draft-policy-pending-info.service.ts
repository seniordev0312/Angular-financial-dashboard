import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DraftPolicyPendingInfo } from '../models/draft-policy-pending-info.model';

@Injectable({
  providedIn: 'root',
})
export class DraftPolicyPendingInfoService {
  fg: FormGroup;
  constructor(public fb: FormBuilder) {}

  getFormGroup(item?: DraftPolicyPendingInfo): FormGroup {
    this.fg = this.fb.group({
      ein: new FormControl(item?.ein || null, [Validators.required]),
      deductibles: new FormControl(item?.deductibles || null, [
        Validators.required,
      ]),
      plateCode: new FormControl(item?.plateCode || null, [
        Validators.required,
      ]),
      sumInsured: new FormControl(item?.sumInsured || null, [
        Validators.required,
      ]),
      make: new FormControl(item?.make || null, [Validators.required]),
      model: new FormControl(item?.model || null, [Validators.required]),
      plate: new FormControl(item?.plate || null, [Validators.required]),
      type: new FormControl(item?.type || null, [Validators.required]),
      color: new FormControl(item?.color || null, [Validators.required]),
      year: new FormControl(item?.year || null, [Validators.required]),
      horsePower: new FormControl(item?.horsePower || null, [
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
  getValueFromFormGroup(fg: FormGroup): DraftPolicyPendingInfo {
    return {
      ein: fg.controls.name.value,
      deductibles: fg.controls.name.value,
      plateCode: fg.controls.name.value,
      sumInsured: fg.controls.name.value,
      make: fg.controls.name.value,
      year: fg.controls.name.value,
      model: fg.controls.name.value,
      plate: fg.controls.name.value,
      type: fg.controls.name.value,
      color: fg.controls.name.value,
      horsePower: fg.controls.name.value,
      parentId: fg.controls.parentId.value,
      id: fg.controls.id.value,
    };
  }
}
