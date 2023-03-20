import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (req.urlWithParams.indexOf(environment.identityServerURL as string) > -1) {
            return next.handle(req);
        }
        if (req?.headers.has('InterceptorSkipContentTypeHeader')) {
            const headers = req?.headers.delete('InterceptorSkipContentTypeHeader');
            req = req?.clone({ headers });
        } else {
            req = req?.clone({ setHeaders: { 'Content-Type': 'application/json', Accept: 'text/plain' } });
        }

        let request: HttpRequest<unknown>;

        if (req?.headers.has('acceptlanguage')) {
            request = req?.clone({
                setHeaders: { 'Accept-Language': req?.headers.get('acceptlanguage') },
            });
        } else {
            const lang = localStorage.getItem('language');
            request = !!lang
                ? req?.clone({
                    setHeaders: { 'Accept-Language': lang },
                })
                : req;
        }

        return next.handle(request);
    }
}
