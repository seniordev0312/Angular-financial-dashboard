import { AddEntityEntry } from "./add-entity.model";

export interface EntitySimilarityModel {
    newEntity: any,
    systemEntity: AddEntityEntry,
    result: AddEntityEntry
}