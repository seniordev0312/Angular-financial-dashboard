import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity-basic-information',
  templateUrl: './entity-basic-information.component.html',
  styleUrls: ['./entity-basic-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityBasicInformationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
