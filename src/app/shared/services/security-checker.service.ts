import { Injectable } from '@angular/core';
import { Permission } from '../models/enums/permissions.enum';
import { UserClaims } from '../models/user-claims.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})

export class SecurityCheckerService {
    userClaimsSubject = new BehaviorSubject<UserClaims>(null);
    userClaims$ = this.userClaimsSubject.asObservable();

    userClaims: UserClaims;
    permissionsListKeys = [
        'dashboard',
        'communication',
        'customer_service',
        'insurance_renewal',
        'general_insurance_underwriting',
        'motor_insurance_underwriting',
        'medical_insurance_underwriting',
        'life_insurance_underwriting', 'cashier',
        'general_accounting',
        'accounts_payable',
        'finance_reporting',
        'payroll',
        'correspondence_management',
        'activity_log',
        'product_management',
        'treaty_management',
        'entity_management',
        'settings',
        'system_setup'
    ];
    constructor() { }

    setUserClaims(userClaims: UserClaims) {
        this.userClaimsSubject.next(userClaims);

        this.userClaims = {
            email: userClaims.email,
            email_verified: userClaims.email_verified,
            name: userClaims.name,
            preferred_username: userClaims.preferred_username,
            role: userClaims.role,
            permissions: []
        };
        //todo delete this function and get permissions list in user data
        this.permissionsListKeys.forEach((item) => {
            if (Object.keys(userClaims).includes(item)) {
                const permission = userClaims[item as keyof typeof userClaims] as Permission | Permission[];
                if (Array.isArray(permission)) {
                    this.userClaims.permissions.push(...permission);
                }
                else {
                    this.userClaims.permissions.push(permission);
                }
            }
        });
    }

    doesUserHasPermission(permission: Permission) {
        return true;
        return this.userClaims?.permissions?.includes(permission);
    }

}
