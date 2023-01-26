import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPaymentComponent implements OnInit {
    barcodeImage: string = '../../../../../../assets/images/accounting-payable/barcode.png';
    docImage: string = '../../../../../../assets/images/accounting-payable/doc.png';
    newDocImage: string = '../../../../../../assets/images/accounting-payable/new-doc.png';
  constructor(
    public dialogRef: MatDialogRef<AddPaymentComponent>,
  ) { }

  ngOnInit(): void {
  }

}
