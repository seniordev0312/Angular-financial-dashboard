export interface UserClaims {
    email: string;
    name: string;
    role: string;//todo replace will enum
    preferred_username: string;
    email_verified: boolean;
    permissions: string[];
    //todo delete and add permissions list in the api
    entity_management?: string;
    dashboard?: string[];
    customer_service?: string[];
}