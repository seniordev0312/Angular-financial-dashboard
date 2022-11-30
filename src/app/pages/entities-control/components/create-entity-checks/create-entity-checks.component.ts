import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-entity-checks',
  templateUrl: './create-entity-checks.component.html',
  styleUrls: ['./create-entity-checks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEntityChecksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
