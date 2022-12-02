import { Component, ChangeDetectionStrategy, Inject, HostListener } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ConfirmationDialogData } from '../../models/dialog-confirmation-data.model';

@Component({
    selector: 'app-dialog-confirmation',
    templateUrl: './dialog-confirmation.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogComponent {
    constructor(
        @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogData,
        private mdDialogRef: MatDialogRef<ConfirmationDialogComponent>
    ) { }

    @HostListener('keydown.esc')
    public onEsc() {
        this.close(false);
    }
    public close(value: boolean) {
        this.mdDialogRef.close(value);
    }
    public confirm() {
        this.close(true);
    }
}
