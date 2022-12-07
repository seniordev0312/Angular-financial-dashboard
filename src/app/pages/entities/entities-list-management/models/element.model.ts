export interface ElementsList {
    id?: string;
    template: number;
    name: string;
    description: string;
    regex: string;
    hasValidation: boolean;
    isMandatory: boolean;
    isSearchable: boolean;
    isIndexable: boolean;
    isNotificationsLocked: boolean;
}