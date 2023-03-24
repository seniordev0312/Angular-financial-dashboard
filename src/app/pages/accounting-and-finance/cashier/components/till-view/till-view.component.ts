import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
// import { BookType } from 'xlsx';

@Component({
  selector: 'app-till-view',
  templateUrl: './till-view.component.html',
  styleUrls: ['./till-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TillViewComponent implements OnInit {
  currencyList = [
    { id: 0, value: 'USD' },
    { id: 1, value: 'LBP' },
  ];
  checkSection: boolean = true;
  checkFontColor: string;
  cashFontColor: string;
  checkFontColors: string[] = ['', 'text-[#365D7D]'];
  cashFontColors: string[] = ['', 'text-[#365D7D]'];

  managementDiaglog: boolean = true;
  constructor() {}

  ngOnInit(): void {
    this.checkFontColor = this.checkFontColors[1];
    this.cashFontColor = this.cashFontColors[0];
  }

  managmentTill() {
    this.managementDiaglog = true;
  }

  changeStatus(status: string) {
    console.log(status);
    //   if ((status = 'check')) {
    //     this.checkSection = true;
    //     this.checkFontColor = this.checkFontColors[1];
    //     this.cashFontColor = this.cashFontColors[0];
    //   } else {
    //     this.checkSection = false;
    //     this.checkFontColor = this.checkFontColors[0];
    //     this.cashFontColor = this.cashFontColors[1];
    //   }
  }
}
