import { Inject, Injectable } from '@angular/core';

import { GENERAL_SYSTEM_SETTINGS_STORE, GeneralSystemSettingsStore } from './general-system-settings.store';

@Injectable({
    providedIn: 'root',
})
export class GeneralSystemSettingsRepository {
    constructor(
        @Inject(GENERAL_SYSTEM_SETTINGS_STORE) private generalSystemSettingsStore: GeneralSystemSettingsStore) {
    }

    updateHolidays(holidays: any) {
        this.generalSystemSettingsStore.update((state) => ({
            ...state,
            holidays: holidays
        }));
    }
    updateGeneralSystemSettings(generalSystemSettings: any) {
        this.generalSystemSettingsStore.update((state) => ({
            ...state,
            generalSystemSettings: generalSystemSettings
        }));
    }
    updateDefaultLanguages(defaultLanguages: any) {
        this.generalSystemSettingsStore.update((state) => ({
            ...state,
            defaultLanguages: defaultLanguages
        }));
    }
    updateDefaultCurrency(defaultCurrency: any) {
        this.generalSystemSettingsStore.update((state) => ({
            ...state,
            defaultCurrency: defaultCurrency
        }));
    }
    updateAccountingStyle(accountingStyle: any) {
        this.generalSystemSettingsStore.update((state) => ({
            ...state,
            accountingStyle: accountingStyle
        }));
    }
    updateCountry(country: any) {
        this.generalSystemSettingsStore.update((state) => ({
            ...state,
            country: country
        }));
    }
}