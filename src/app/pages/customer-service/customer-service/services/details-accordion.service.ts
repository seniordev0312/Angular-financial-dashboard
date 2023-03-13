import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AccordionDetails } from '../models/accordion-details.model';

@Injectable({
  providedIn: 'root',
})
export class DetailsAccordionService {
  fg: FormGroup;
  constructor(public fb: FormBuilder) {}

  getFormGroup(item?: AccordionDetails): FormGroup {
    this.fg = this.fb.group({
      description: new FormControl(item?.description || null, [
        Validators.required,
      ]),
    });

    return this.fg;
  }

  setParentId(parentId: number) {
    this.fg.controls.parentId.setValue(parentId);
  }
  setId(id: number) {
    this.fg.controls.id.setValue(id);
  }
  getValueFromFormGroup(fg: FormGroup): AccordionDetails {
    return {
      description: fg.controls.name.value,
    };
  }
}
