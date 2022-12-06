import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entity-type',
  templateUrl: './entity-type.component.html',
  styleUrls: ['./entity-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityTypeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
