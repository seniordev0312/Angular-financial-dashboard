export interface UserPolicy {
    isComplexPasswordForced: boolean;
    isChangePasswordForced: boolean;
    minPasswordLength: number;
    maxTrialsBeforeLockingLength: number;
    numberOfDays: number;
}