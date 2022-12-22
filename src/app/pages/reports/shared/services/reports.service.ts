import { Injectable } from "@angular/core";
import { ReportsRepository } from "../store/reports.repository";

@Injectable({ providedIn: 'root' })
export class ReportsService {
    constructor(
        private reportsRepository: ReportsRepository
    ) { }

    updateReportA(report: any): void {
        this.reportsRepository.updateReportA(report);
    }


    updateReportB(report: any): void {
        this.reportsRepository.updateReportB(report);
    }

    updateReportC(report: any): void {
        this.reportsRepository.updateReportC(report);
    }
    getReportA() {
        return this.reportsRepository.getReportA();
    }

    getReportB() {
        return this.reportsRepository.getReportB();
    }

    getReportC() {
        return this.reportsRepository.getReportC();
    }
}