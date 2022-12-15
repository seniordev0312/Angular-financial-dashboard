import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

/* eslint-disable @typescript-eslint/ban-types */
@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(
        private oidcSecurityService: OidcSecurityService
    ) { }

    get isLoggedIn() {
        return this.oidcSecurityService.isAuthenticated$;
    }
    get token() {
        return this.oidcSecurityService.getAccessToken();
    }
    get userData() {
        return this.oidcSecurityService.userData$;
    }

    checkAuth() {
        return this.oidcSecurityService.checkAuth();
    }

    login() {
        return this.oidcSecurityService.authorize();
    }

    signOut() {
        this.oidcSecurityService.logoff();
    }
}
