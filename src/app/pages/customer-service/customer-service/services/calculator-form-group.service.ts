import { Injectable } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CalculatorCarInfo } from '../models/calculator-car-info.model';

@Injectable({
  providedIn: 'root',
})
export class CalculatorFormGroupService {
  fg: FormGroup;
  constructor(public fb: FormBuilder) {}

  getFormGroup(item?: CalculatorCarInfo): FormGroup {
    this.fg = this.fb.group({
      make: new FormControl(item?.make || null, [Validators.required]),
      brand: new FormControl(item?.brand || null, [Validators.required]),
      model: new FormControl(item?.model || null, [Validators.required]),
      plate: new FormControl(item?.plate || null, [Validators.required]),
      type: new FormControl(item?.type || null, [Validators.required]),
      color: new FormControl(item?.color || null, [Validators.required]),
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
  getValueFromFormGroup(fg: FormGroup): CalculatorCarInfo {
    return {
      make: fg.controls.name.value,
      brand: fg.controls.name.value,
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
