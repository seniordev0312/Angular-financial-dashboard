import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity-address-information',
  templateUrl: './entity-address-information.component.html',
  styleUrls: ['./entity-address-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityAddressInformationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
