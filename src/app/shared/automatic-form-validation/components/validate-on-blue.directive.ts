import { Directive, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[validate-onblur]',
})
export class ValidateOnBlurDirective {
  constructor(public formControl: NgControl) {
  }

  @HostListener('blur') onBlur() {
    this.formControl.control.markAsTouched();
    console.log('test');
  }
}
