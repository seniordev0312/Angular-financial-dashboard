import { PayrollListItem } from "./payroll-list-item.model";

export interface PayrollList {
    data: PayrollListItem[];
    dataCount: number;
}