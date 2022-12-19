import { Permission } from "./enums/permissions.enum";

export interface UserClaims {
    email: string;
    name: string;
    role: string;//todo replace will enum
    preferred_username: string;
    email_verified: boolean;
    permissions: Permission[];
    //todo delete and add permissions list in the api
    entity_management?: Permission[] | Permission;
    customer_service?: Permission[] | Permission;
    dashboard?: Permission[] | Permission;
    communication?: Permission[] | Permission;
    insurance_renewal?: Permission[] | Permission;
    general_insurance_underwriting?: Permission[] | Permission;
    motor_insurance_underwriting?: Permission[] | Permission;
    medical_insurance_underwriting?: Permission[] | Permission;
    life_insurance_underwriting?: Permission[] | Permission;
    cashier?: Permission[] | Permission;
    general_accounting?: Permission[] | Permission;
    accounts_payable?: Permission[] | Permission;
    finance_reporting?: Permission[] | Permission;
    payroll?: Permission[] | Permission;
    correspondence_management?: Permission[] | Permission;
    activity_log?: Permission[] | Permission;
    product_management?: Permission[] | Permission;
    treaty_management?: Permission[] | Permission;
    settings?: Permission[] | Permission;
    system_setup?: Permission[] | Permission;
}