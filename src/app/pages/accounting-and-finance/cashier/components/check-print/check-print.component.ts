import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-print',
  templateUrl: './check-print.component.html',
  styleUrls: ['./check-print.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckPrintComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
