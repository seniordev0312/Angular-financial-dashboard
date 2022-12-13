export interface PolicyCard {
  left: {
    leftD: string;
    leftH: string;
    leftM: string;
    backgroundColor: string;
    svg: string;
  };
  customer: {
    svg: string;
    photo: string;
    name: string;
    ein: string;
    einNumber: string;
  };
  assignedClient: {
    name: string;
    textColor: string;
    borderColor: string;
    photo: string;
  };
  date: string;
  prf: string;
}
