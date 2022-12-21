export interface DynamicFilter {
    elementName: string;
    elementType: number;
    script: string;
    description: string;
    validation: boolean;
    regularExpression: string;
    mandatory: boolean;
    searchable: boolean;
    indexable: boolean;
    lockModifications: boolean;
}