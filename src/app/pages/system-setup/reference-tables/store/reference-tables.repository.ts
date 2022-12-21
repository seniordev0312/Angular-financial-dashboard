import { Injectable, Inject } from "@angular/core";
import { REFERENCE_TABLE_STORE, ReferenceTablesStore } from "./reference-tables.store";


@Injectable({ providedIn: 'root' })
export class ReferenceTablesRepository {
    constructor(
        @Inject(REFERENCE_TABLE_STORE) private referenceTablesStore: ReferenceTablesStore
    ) { }

    updateReferenceTables(referenceTables: any) {
        this.referenceTablesStore.update((state) => ({
            ...state,
            referenceTables: referenceTables
        }));
    }
}