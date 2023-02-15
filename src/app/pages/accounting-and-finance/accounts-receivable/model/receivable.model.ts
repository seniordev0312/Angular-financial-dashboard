export interface ReceivableModel {
  id: number;
  ein: string;
  name: string;
  commission: number;
  status: string;
  currency: string;
  ytd: number;
  premiumdue: number;
  duedate: string;
}
