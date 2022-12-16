import { Injectable } from '@angular/core';
import { UserClaims } from '../models/user-claims.model';

@Injectable({
    providedIn: 'root',
})

export class SecurityCheckerService {
    userClaims: UserClaims;
    constructor() { }

    setUserClaims(userClaims: UserClaims) {
        this.userClaims = {
            email: userClaims.email,
            email_verified: userClaims.email_verified,
            name: userClaims.name,
            preferred_username: userClaims.preferred_username,
            role: userClaims.role,
            permissions: [...userClaims.dashboard, ...userClaims.customer_service, userClaims.entity_management]
        };
    }

    doesUserHasPermission(permission: string) {
        return this.userClaims?.permissions?.includes(permission);
        // return false;
    }

}
