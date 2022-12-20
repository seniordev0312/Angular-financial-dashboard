import { Injectable } from "@angular/core";
import { ReportsRepository } from "../store/reports.repository";

@Injectable({ providedIn: 'root' })
export class ReportsService {
    constructor(
        private reportsRepository: ReportsRepository
    ) { }

    updateReports(report: any): void {
        this.reportsRepository.updateReports(report);
    }

    getReports() {
        return this.reportsRepository.getReports();
    }
}