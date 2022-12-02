import { Component, ChangeDetectionStrategy, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogData } from '../../models/dialog-confirmation-data.model';

@Component({
    selector: 'app-base-dialog-notification',
    template: '',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseDialogComponent<T> {
    constructor(@Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData, private mdDialogRef: MatDialogRef<T>) { }

    @HostListener('keydown.esc')
    public onEsc() {
        this.close(false);
    }
    public cancel() {
        this.close(false);
    }
    public close(value: boolean) {
        this.mdDialogRef.close(value);
    }
    public confirm() {
        this.close(true);
    }
}
