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
}