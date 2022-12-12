export interface AddRelationshipType {
    id?: string;
    code: string;
    back: string;
    forward: string
    description: string;
    allowedEntities: string[];
}