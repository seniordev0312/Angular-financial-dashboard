import { Inject, Injectable } from '@angular/core';
import { CompanySetupStore, COMPANY_SETUP_STORE } from './company-setup.store';

@Injectable({
    providedIn: 'root',
})
export class CompanySetupRepository {
    constructor(
        @Inject(COMPANY_SETUP_STORE) private companySetupStore: CompanySetupStore) {
    }

    updateCompanySetup(companySetup: any) {
        this.companySetupStore.update((state) => ({
            ...state,
            companySetup: companySetup
        }));

    }
}