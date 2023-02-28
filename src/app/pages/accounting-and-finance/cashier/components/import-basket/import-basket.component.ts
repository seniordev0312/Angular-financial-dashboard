import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-import-basket',
  templateUrl: './import-basket.component.html',
  styleUrls: ['./import-basket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportBasketComponent implements OnInit {
  constructor() { }

  policyNumber: string = "";
  warnText: string = "";

  checkList = [
    {
      state: true,
      content: 'MGW193389',
    },
    {
      state: true,
      content: 'MGW296389',
    },
    {
      state: true,
      content: 'MGW196189',
    },
    {
      state: true,
      content: 'MGWs96389',
    },
    {
      state: true,
      content: 'M6W196389',
    },
    {
      state: false,
      content: 'MGW196789',
    },
    {
      state: true,
      content: 'MGW198389',
    },
  ];

  addBusket() {
    let flag = 0;
    for (let i = 0; i < this.checkList.length; i++) {
      if (this.policyNumber === this.checkList[i].content) {
        flag = 1;
        break;
      }
    }
    if (flag == 1) {
      this.warnText = "the policy number already exists";
    }
    else {
      let list = {
        state: true,
        content: this.policyNumber
      }
      this.checkList.push(list);
      this.warnText = "";
    }
    console.log(this.warnText, this.checkList);
  }



  ngOnInit(): void { }
}
