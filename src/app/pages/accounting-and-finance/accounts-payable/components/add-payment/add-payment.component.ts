import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddPaymentComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddPaymentComponent>,
  ) { }

  ngOnInit(): void {}

}
