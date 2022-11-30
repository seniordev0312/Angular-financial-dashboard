import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[appValidationMessageContainer]',
    exportAs: 'appValidationMessageContainer'
})

export class ErrorMessageContainerDirective {
    constructor(private vcr: ViewContainerRef) {}

    getVcr() {
        return this.vcr;
    }
}
