import { Inject, Injectable } from '@angular/core';

import { REPORTS_STORE, ReportsStore } from './reports.store';

@Injectable({ providedIn: 'root' })
export class ReportsRepository {
    constructor(
        @Inject(REPORTS_STORE) private reportsStore: ReportsStore) {
    }

    updateReportA(report: any) {
        this.reportsStore.update((state) => ({
            ...state,
            reportA: report
        }));
    }

    updateReportB(report: any) {
        this.reportsStore.update((state) => ({
            ...state,
            reportB: report
        }));
    }

    updateReportC(report: any) {
        this.reportsStore.update((state) => ({
            ...state,
            reportC: report
        }));
    }

    getReportA() {
        return this.reportsStore.value.reportA;
    }
    getReportB() {
        return this.reportsStore.value.reportB;
    }
    getReportC() {
        return this.reportsStore.value.reportC;
    }
}