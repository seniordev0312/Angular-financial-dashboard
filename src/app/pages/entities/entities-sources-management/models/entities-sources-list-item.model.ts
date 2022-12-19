export interface EntitiesSourcesListItem {
    entitySourceId: string;
    sourceName: string;
    isLockModification: boolean;

    //helper
    isNotLockModification: boolean;
}