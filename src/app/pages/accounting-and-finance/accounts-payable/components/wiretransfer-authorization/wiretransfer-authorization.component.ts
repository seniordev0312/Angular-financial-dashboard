import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-wiretransfer-authorization',
  templateUrl: './wiretransfer-authorization.component.html',
  styleUrls: ['./wiretransfer-authorization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WiretransferAuthorizationComponent implements OnInit {
  unlockImage: string =
    '../../../../../../assets/images/accounting-payable/unlock.png';
  wireTransferImage: string =
    '../../../../../../assets/images/accounting-payable/wire-transfer.png';

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  onClose(): void {
    this.dialog.closeAll();
  }
}
