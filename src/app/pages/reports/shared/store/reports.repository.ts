import { Inject, Injectable } from '@angular/core';

import { REPORTS_STORE, ReportsStore } from './reports.store';

@Injectable({ providedIn: 'root' })
export class ReportsRepository {
    constructor(
        @Inject(REPORTS_STORE) private reportsStore: ReportsStore) {
    }

    updateReports(report: any) {
        let newReports: any[] = [];
        if (this.reportsStore.value.reports) {
            newReports = [...this.reportsStore.value.reports];
        }
        let index = newReports.findIndex((e: any) => e.id === report.id);
        if (index !== -1) {
            newReports[index] = report;
        } else {
            newReports.push(report)
        }
        console.log('newReports', newReports);

        this.reportsStore.update((state) => ({
            ...state,
            reports: newReports
        }));
    }

    getReports() {
        return this.reportsStore.value.reports;
    }
}