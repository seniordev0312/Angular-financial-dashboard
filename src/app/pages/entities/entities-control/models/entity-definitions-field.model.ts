export interface EntityDefinitionsField {
    elementName: string;
    elementType: number;
    description: string;
    validation: boolean;
    regularExpression: string;
    mandatory: boolean;
    searchable: boolean;
    indexable: boolean;
    lockModifications: boolean;
}