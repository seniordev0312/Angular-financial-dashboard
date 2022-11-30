import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: 'mat-form-field'
})

export class FormFieldWrapperDirective {
    constructor(private vcr: ViewContainerRef) {}

    getVcr() {
        return this.vcr;
    }
}
