import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-validation-message',
    template: '<mat-error class="text-xs leading-none mt-1" [class.hidden]="hide">{{textMessage}}</mat-error>',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationMessageComponent {
    textMessage = '';
    hide = true;

    @Input()
    set text(value: string) {
        if (this.textMessage !== value) {
            this.textMessage = value;
            this.hide = false;
            this.cdr.detectChanges();
        }
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    constructor(private cdr: ChangeDetectorRef) { }
}
