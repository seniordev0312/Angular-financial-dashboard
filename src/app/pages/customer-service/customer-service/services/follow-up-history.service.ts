import { Injectable } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FollowUpHistory } from '../models/follow-up-history.model';

@Injectable({
  providedIn: 'root',
})
export class FollowUpHistoryService {
  fg: FormGroup;
  constructor(public fb: FormBuilder) {}

  getFormGroup(item?: FollowUpHistory): FormGroup {
    this.fg = this.fb.group({
      details: new FormControl(item?.details || null, [
        Validators.required,
      ]),
      additionalDetails: new FormControl(item?.additionalDetails || null),
      policyAgreedPrice: new FormControl(item?.policyAgreedPrice || null),
    });

    return this.fg;
  }

  setParentId(parentId: number) {
    this.fg.controls.parentId.setValue(parentId);
  }
  setId(id: number) {
    this.fg.controls.id.setValue(id);
  }
  getValueFromFormGroup(fg: FormGroup): FollowUpHistory {
    return {
      details: fg.controls.name.value,
      additionalDetails: fg.controls.name.value,
      policyAgreedPrice: fg.controls.name.value,
    };
  }
}
