import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VendorInvoiceComponent } from '../vendor-invoice/vendor-invoice.component';

@Component({
  selector: 'app-rejected-wiretransfer',
  templateUrl: './rejected-wiretransfer.component.html',
  styleUrls: ['./rejected-wiretransfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RejectedWiretransferComponent implements OnInit {

  unlockImage: string =
    '../../../../../../assets/images/accounting-payable/unlock.png';
  wireTransferImage: string =
    '../../../../../../assets/images/accounting-payable/wire-transfer.png';

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialog.closeAll();
  }

  openVendorInvoice() {
    this.dialog.open(VendorInvoiceComponent, {
      width: '70%',
      height: '95%',
    });
  }

}
