export interface RelationshipTypesListItem {
    entityTypeRelationshipId: string;
    lock: boolean;
    backward: string;
    forward: string
    description: string;
    allowedEntities: string[];

    //helper 
    canEdit: boolean;
}