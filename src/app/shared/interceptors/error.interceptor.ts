import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, EMPTY, Observable, } from 'rxjs';
import { SnackBarNotificationService } from '../notifications/services/snackbar-notification.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private snackBarNotificationService: SnackBarNotificationService) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 500) {
                    this.snackBarNotificationService.error('Unexpected Error', 'bottom', 'right');
                }
                else if (error.status >= 400) {
                    this.snackBarNotificationService.error(error.error?.title, 'bottom', 'right');
                }
                return EMPTY;
            })
        )
    }
}