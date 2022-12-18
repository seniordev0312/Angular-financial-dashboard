import { Injectable } from '@angular/core';
import { Permission } from '../models/enums/permissions.enum';
import { UserClaims } from '../models/user-claims.model';

@Injectable({
    providedIn: 'root',
})

export class SecurityCheckerService {
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

    doesUserHasPermission(_permission: Permission) {
        // return this.userClaims?.permissions?.includes(permission);
        return true;
    }

}
