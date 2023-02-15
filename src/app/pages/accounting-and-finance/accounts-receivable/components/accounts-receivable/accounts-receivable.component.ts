import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-receivable',
  templateUrl: './accounts-receivable.component.html',
  styleUrls: ['./accounts-receivable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountsReceivableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
