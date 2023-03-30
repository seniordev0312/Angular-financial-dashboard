import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs/operators';
import { ConfirmationDialogData } from '../models/dialog-confirmation-data.model';
import { ConfirmationDialogComponent } from '../components/dialog-confirmation/dialog-confirmation.component';

@Injectable({
    providedIn: 'root',
})
export class ConfirmationDialogService {
    dialogRef: MatDialogRef<ConfirmationDialogComponent>;
    dialogRefClose$ = new Subject<any>();
    constructor(private dialog: MatDialog) { }

    public open(options?: ConfirmationDialogData, confirmationDialog?: any, width?: string) {
        this.dialogRef = this.dialog.open(confirmationDialog ?? ConfirmationDialogComponent, {
            data: options,
            panelClass: 'notification-dialog',
            width: width ?? '400px',
            height: '220px'
        });
        this.dialogRef
            .afterClosed()
            .pipe(take(1))
            .subscribe((result) => {
                this.dialogRefClose$.next(result);
            });
    }
    public confirmed(): Observable<any> {
        return this.dialogRefClose$;
    }
}
