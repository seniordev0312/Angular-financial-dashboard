import { OnDestroy, Directive } from '@angular/core';
import { Subscription } from 'rxjs';
@Directive({
    selector: '[BaseComponent]',
})
export class BaseComponent implements OnDestroy {
    protected subscriptions = new Subscription();

    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
        if (Array.isArray(this.subscriptions)) {
            this.subscriptions.forEach((s) => s.unsubscribe());
        }
    }

    isEmpty(data: any) {
        if (data === null) {
            return true;
        }
        if (Array.isArray(data)) {
            return data.length === 0;
        } else if (typeof data === 'object') {
            return Object.keys(data).length === 0;
        } else if (data === undefined) {
            return true;
        } else if (typeof data === 'string') {
            return data.length === 0;
        } else {
            return !!data;
        }
    };

}

