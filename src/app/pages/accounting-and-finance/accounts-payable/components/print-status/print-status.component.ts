import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import FileSaver from 'file-saver';

@Component({
  selector: 'app-print-status',
  templateUrl: './print-status.component.html',
  styleUrls: ['./print-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrintStatusComponent implements OnInit {
  printImage: string =
    '../../../../../../assets/images/accounting-payable/print.png';

  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialog.closeAll();
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.data); // Sale Data
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Detail_File");
    });
  }
  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    let EXCEL_EXTENSION = ".xlsx";
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(
      data,
      fileName + "_export_" + new Date().getTime() + EXCEL_EXTENSION
    );
  }
}
