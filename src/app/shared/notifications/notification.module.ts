import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from './components/dialog-confirmation/dialog-confirmation.component';
import { ConfirmationDialogService } from './services/dialog-confirmation.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SnackbarNotificationComponent } from './components/snack-bar-notification/snackbar-notification.component';
import { SnackBarNotificationService } from './services/snackbar-notification.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
    declarations: [
        SnackbarNotificationComponent,
        ConfirmationDialogComponent
    ],
    imports: [
        CommonModule,
        TranslateModule,
        MatIconModule,
        MatSnackBarModule,
        MatButtonModule,
        MatDialogModule
    ],
    exports: [ConfirmationDialogComponent],
    providers: [SnackBarNotificationService, ConfirmationDialogService],
})
export class NotificationModule { }
