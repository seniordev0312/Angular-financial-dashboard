import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationDialogComponent } from './components/dialog-confirmation/dialog-confirmation.component';
import { ConfirmationDialogService } from './services/dialog-confirmation.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [ConfirmationDialogComponent],
    imports: [
        CommonModule,
        TranslateModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule
    ],
    exports: [ConfirmationDialogComponent],
    providers: [ConfirmationDialogService],
})
export class NotificationModule { }
