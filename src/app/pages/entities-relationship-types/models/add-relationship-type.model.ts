export interface AddRelationshipType {
    code: string;
    back: string;
    forward: string
    description: string;
    allowedEntities: string[];
}