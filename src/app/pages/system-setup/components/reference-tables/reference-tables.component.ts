import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reference-tables',
  templateUrl: './reference-tables.component.html',
  styleUrls: ['./reference-tables.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferenceTablesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
