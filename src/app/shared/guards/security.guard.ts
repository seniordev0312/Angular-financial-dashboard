import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { map } from 'rxjs/operators';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { SecurityCheckerService } from '../services/security-checker.service';
import { UserClaims } from '../models/user-claims.model';

@Injectable()
export class SecurityGuard implements CanActivate {
    userClaims: UserClaims;

    constructor(
        private oidcSecurityService: OidcSecurityService,
        private securityCheckService: SecurityCheckerService,
    ) { }

    canActivate(router: ActivatedRouteSnapshot): Observable<boolean> {
        return this.oidcSecurityService.userData$.pipe(
            map(({ userData }) => {
                if (userData) {
                    this.userClaims = userData;
                    if (Object.keys(userData).length) {
                        this.securityCheckService.setUserClaims(userData);
                        return this.securityCheckService.doesUserHasPermission(router.data.permission);
                    }
                    return false;
                }
                return false;
            })
        );
    }

}

