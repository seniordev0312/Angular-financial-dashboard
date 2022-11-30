import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-accounting',
  templateUrl: './general-accounting.component.html',
  styleUrls: ['./general-accounting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralAccountingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
