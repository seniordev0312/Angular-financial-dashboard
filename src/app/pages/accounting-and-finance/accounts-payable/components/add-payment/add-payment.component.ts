import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { ProcessingPaymentComponent } from '../processing-payment/processing-payment.component';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddPaymentComponent implements OnInit {
  barcodeImage: string =
    '../../../../../../assets/images/accounting-payable/barcode.png';
  docImage: string =
    '../../../../../../assets/images/accounting-payable/doc.png';
  newDocImage: string =
    '../../../../../../assets/images/accounting-payable/new-doc.png';
  constructor(
    public dialogRef: MatDialogRef<AddPaymentComponent>,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openProcessingPayment() {
    this.dialog.open(ProcessingPaymentComponent, {
      width: '90%',
      height: '90%',
    });
  }
}
