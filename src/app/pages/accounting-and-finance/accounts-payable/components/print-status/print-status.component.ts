import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-print-status',
  templateUrl: './print-status.component.html',
  styleUrls: ['./print-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrintStatusComponent implements OnInit {
  printImage: string =
    '../../../../../../assets/images/accounting-payable/print.png';

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
  }

  onClose() : void {
    this.dialog.closeAll();
  }
}
