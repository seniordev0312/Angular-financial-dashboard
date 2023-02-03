import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-processing-payment',
  templateUrl: './processing-payment.component.html',
  styleUrls: ['./processing-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProcessingPaymentComponent implements OnInit {
  checksImage: string =
    '../../../../../../assets/images/accounting-payable/Checks.png';
  wireTransferImage: string =
    '../../../../../../assets/images/accounting-payable/wire-transfer.png';
  unlockImage: string =
    '../../../../../../assets/images/accounting-payable/unlock.png';
  medgulfImage: string =
    '../../../../../../assets/images/accounting-payable/Group-25.png';
  tab: number = 1;
  constructor(public dialogRef: MatDialogRef<ProcessingPaymentComponent>) {}

  ngOnInit(): void {}

  tabSelection(currentTab: number): void {
    this.tab = currentTab;
  }
}
