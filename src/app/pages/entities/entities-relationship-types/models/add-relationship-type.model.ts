export interface AddRelationshipType {
    entityTypeRelationshipId?: string;
    backward: string;
    forward: string
    description: string;
    allowedEntities: string[];
    lock: boolean;
}