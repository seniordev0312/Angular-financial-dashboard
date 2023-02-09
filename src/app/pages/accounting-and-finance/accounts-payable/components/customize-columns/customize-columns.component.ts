import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customize-columns',
  templateUrl: './customize-columns.component.html',
  styleUrls: ['./customize-columns.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CustomizeColumnsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
