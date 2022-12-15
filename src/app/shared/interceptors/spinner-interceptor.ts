import { Injectable } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';

@Injectable({
    providedIn: 'root',
})
export class SpinnerInterceptor implements HttpInterceptor {
    constructor(private spinnerService: SpinnerService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (
            (req?.headers.get('process') && req?.headers.get('process') === 'background') ||
            req?.url.endsWith('.svg') ||
            req?.urlWithParams.indexOf('connect/token') > 0
        ) {
            return next.handle(req);
        } else if (req?.headers.has('InterceptorHideSpinner')) {
            const headers = req?.headers.delete('InterceptorHideSpinner');
            req = req?.clone({ headers });
            return next.handle(req);
        }
        else if (req?.headers.has('InterceptorShowSidenavSpinner')) {
            const headers = req?.headers.delete('InterceptorShowSidenavSpinner');
            req = req?.clone({ headers });
            this.showSidenavLoader();
            return next.handle(req).pipe(finalize(() => this.onSidenavSpinnerEnd()));
        }
        else {
            this.showLoader();
            return next.handle(req).pipe(finalize(() => this.onEnd()));
        }
    }

    private onEnd(): void {
        this.spinnerService.stopSpinning();
    }
    private showLoader(): void {
        this.spinnerService.startSpinning();
    }


    private onSidenavSpinnerEnd(): void {
        this.spinnerService.stopSidenavSpinning();
    }
    private showSidenavLoader(): void {
        this.spinnerService.startSidenavSpinning();
    }

}
