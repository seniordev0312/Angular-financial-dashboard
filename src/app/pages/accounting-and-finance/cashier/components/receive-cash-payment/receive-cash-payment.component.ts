import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'app-receive-cash-payment',
  templateUrl: './receive-cash-payment.component.html',
  styleUrls: ['./receive-cash-payment.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReceiveCashPaymentComponent implements OnInit {
  @Input() printDialog: boolean;
  previewModal: boolean;
  @Output() printDialogChange = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  print() {
    this.printDialog = true;
    this.printDialogChange.emit(this.printDialog);
  }
}
