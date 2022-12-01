import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity-bank-account-information',
  templateUrl: './entity-bank-account-information.component.html',
  styleUrls: ['./entity-bank-account-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityBankAccountInformationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
