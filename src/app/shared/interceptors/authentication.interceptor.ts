import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthenticationService } from "../services/auth.service";
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService) { }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
        this.authenticationService.token.subscribe((token: any) => {
            console.log(token);
            request = request?.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        })
        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error instanceof HttpErrorResponse && error.status === HttpStatusCode.Forbidden) {
                    // return this.router.navigate([`${ApplicationRoutes.Forbidden}`]);
                } else if (error instanceof HttpErrorResponse && error.status === HttpStatusCode.Unauthorized) {
                    this.authenticationService.login();
                }
                return throwError(error);
            })
        );
    }
}
