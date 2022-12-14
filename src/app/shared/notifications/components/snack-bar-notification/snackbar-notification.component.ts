import { Component, ChangeDetectionStrategy, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { Router, ActivationStart } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { SnackbarData, SnackbarStatusEnum } from '../../models/snackbar-data.model';
@Component({
    selector: 'app-gallery-manager',
    templateUrl: './snackbar-notification.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarNotificationComponent extends BaseComponent implements OnInit {

    mapStatusToIcon = {
        [SnackbarStatusEnum.SUCCESS.toString()]: 'check_circle',
        [SnackbarStatusEnum.INFO.toString()]: 'info',
        [SnackbarStatusEnum.ERROR.toString()]: 'error',
        [SnackbarStatusEnum.WARNING.toString()]: 'warning',
        [SnackbarStatusEnum.NOTIFICATION.toString()]: 'notification_important',
    };

    mapStatusToColor = {
        [SnackbarStatusEnum.SUCCESS.toString()]: 'text-success',
        [SnackbarStatusEnum.INFO.toString()]: 'text-accent',
        [SnackbarStatusEnum.ERROR.toString()]: 'text-warn',
        [SnackbarStatusEnum.WARNING.toString()]: 'text-orange',
        [SnackbarStatusEnum.NOTIFICATION.toString()]: 'text-purple',
    };
    constructor(
        @Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData,
        public snackBarRef: MatSnackBarRef<SnackbarNotificationComponent>,
        private router: Router
    ) {
        super();
    }

    ngOnInit(): void {
        this.subscriptions.add(
            this.router.events.subscribe((e) => {
                if (e instanceof ActivationStart) {
                    this.snackBarRef.dismiss();
                }
            })
        );
    }
}
