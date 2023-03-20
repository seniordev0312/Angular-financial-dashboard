import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { SnackBarNotificationService } from '../notifications/services/snackbar-notification.service';
@Injectable({
    providedIn: 'root',
})
export class SuccessMessageInterceptor implements HttpInterceptor {
    constructor(private snackBarNotificationService: SnackBarNotificationService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            map((event: HttpEvent<any>) => {
                if (req?.urlWithParams.indexOf('connect/token') > -1) {
                    return event;
                }

                if (event instanceof HttpResponse) {
                    if (this.doesShowSuccessMessage(req, event)) {
                        this.showSuccessMessage();
                    }
                }
                return event;
            })
        );
    }

    doesShowSuccessMessage(req: HttpRequest<any>, res: HttpResponse<any>): boolean {
        if (req?.headers.get('process') && req?.headers.get('process') === 'background') {
            return false;
        }
        if (req.url.indexOf('connect/token') > -1) {
            return false;
        }
        if (req?.headers.has('InterceptorHideSuccessMessage')) {
            const headers = req?.headers.delete('InterceptorHideSuccessMessage');
            req = req?.clone({ headers });
            return false;
        }
        if (req?.method !== 'GET' && res?.status === 200) {
            return false;
        }
        return false;
    }

    showSuccessMessage() {
        this.snackBarNotificationService.success('Operation has accomplished successfully', 'bottom', 'right');
    }
}
