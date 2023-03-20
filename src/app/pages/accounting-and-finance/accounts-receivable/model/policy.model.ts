export interface PolicyModel {
  id: number;
  no: string;
  type: string;
  ein: string;
  name: string;
  currency: string;
  premiums: number;
  dueGrossdate: number;
  dueNetdate: number;
  agentcommission: number;
  balance: string;
  issueDate: string;
  inceptiondate: string;
  expirydate: string;
}
