export interface RelationshipTypesListItem {
    id: string;
    code: string;
    back: string;
    forward: string
    description: string;
    allowedEntities: string[];
}