import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-flow',
  templateUrl: './sales-flow.component.html',
  styleUrls: ['./sales-flow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SalesFlowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
