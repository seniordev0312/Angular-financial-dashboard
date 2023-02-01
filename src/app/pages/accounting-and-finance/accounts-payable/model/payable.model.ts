export interface PayableModel {
  id: number;
  ein: string;
  name: string;
  currency: string;
  amount: number;
  amountnotdue: number;
}
