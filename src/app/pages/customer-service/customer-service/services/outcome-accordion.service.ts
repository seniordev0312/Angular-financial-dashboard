import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AccordionOutcome } from '../models/accordion-outcome.model';

@Injectable({
  providedIn: 'root',
})
export class OutcomeAccordionService {
  fg: FormGroup;
  constructor(public fb: FormBuilder) {}

  getFormGroup(item?: AccordionOutcome): FormGroup {
    this.fg = this.fb.group({
      outcome: new FormControl(item?.outcome || null, [Validators.required]),
    });

    return this.fg;
  }

  setParentId(parentId: number) {
    this.fg.controls.parentId.setValue(parentId);
  }

  setId(id: number) {
    this.fg.controls.id.setValue(id);
  }

  getValueFromFormGroup(fg: FormGroup): AccordionOutcome {
    return {
      outcome: fg.controls.name.value,
    };
  }
}
