import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-entity-type',
  templateUrl: './entity-type.component.html',
  styleUrls: ['./entity-type.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntityTypeComponent implements OnInit {
  entityTypeFormControl = new FormControl();
  constructor() { }

  ngOnInit(): void {
  }

}
