import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity-kyc-information',
  templateUrl: './entity-kyc-information.component.html',
  styleUrls: ['./entity-kyc-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityKycInformationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
