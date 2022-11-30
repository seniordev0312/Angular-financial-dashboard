import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-accounts-payable',
  templateUrl: './accounts-payable.component.html',
  styleUrls: ['./accounts-payable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsPayableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
