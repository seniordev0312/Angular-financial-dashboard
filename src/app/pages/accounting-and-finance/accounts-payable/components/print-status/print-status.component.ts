import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-print-status',
  templateUrl: './print-status.component.html',
  styleUrls: ['./print-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrintStatusComponent implements OnInit {
  printImage: string =
    '../../../../../../assets/images/accounting-payable/print.png';

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}

  onClose(): void {
    this.dialog.closeAll();
  }

  exportExcel() {}
}
