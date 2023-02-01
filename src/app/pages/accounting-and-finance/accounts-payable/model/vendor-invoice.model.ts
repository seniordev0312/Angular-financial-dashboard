export interface VendorInvoiceModel {
  id: number;
  policyno: string;
  name: string;
  duedate: Date;
  totalunpaidnotdue: number;
  totalunpaiddue: number;
  currency: string;
  invoicetype: string;
  custom: number;
}
