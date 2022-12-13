import { Injectable, Inject } from "@angular/core";
import { SystemClaimsList } from "../models/system-claims-list.model";
import { SystemClaimsStore, SYSTEM_CLAIMS_STORE } from "./system-claims.store";

@Injectable({
    providedIn: 'root',
})
export class SystemClaimsRepository {
    constructor(
        @Inject(SYSTEM_CLAIMS_STORE) private systemClaimsStore: SystemClaimsStore) {
    }

    updateSystemClaims(systemClaims: SystemClaimsList) {
        this.systemClaimsStore.update((state) => ({
            ...state,
            systemClaims: systemClaims
        }));
    }
}