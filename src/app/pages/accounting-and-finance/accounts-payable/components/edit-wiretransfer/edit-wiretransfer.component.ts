import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VendorInvoiceComponent } from '../vendor-invoice/vendor-invoice.component';

@Component({
  selector: 'app-edit-wiretransfer',
  templateUrl: './edit-wiretransfer.component.html',
  styleUrls: ['./edit-wiretransfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditWiretransferComponent implements OnInit {
  unlockImage: string =
    '../../../../../../assets/images/accounting-payable/unlock.png';

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

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
