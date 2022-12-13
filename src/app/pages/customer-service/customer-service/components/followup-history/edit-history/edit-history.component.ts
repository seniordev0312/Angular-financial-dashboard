import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-edit-history',
  templateUrl: './edit-history.component.html',
  styleUrls: ['./edit-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditHistoryComponent implements OnInit {

  constructor() { }

  @Input() pageFlage = '';
  bgColorRequest: string = 'bg-main-gray';
  bgColorSend: string = 'bg-main-gray';
  colorRequest: string = '';
  colorSend: string = '';
  pageFlag: string = 'main';

  ngOnInit(): void {
  }

  pageEvent(flag: string) {
    if(flag =='request') {
      this.pageFlag = flag;
      this.bgColorRequest = 'bg-primary';
      this.colorRequest = 'color-white'
    }
    if(flag =='send') {
      this.pageFlag = flag;
      this.bgColorSend = 'bg-primary';
      this.colorSend = 'color-white'
    }
  }

}
