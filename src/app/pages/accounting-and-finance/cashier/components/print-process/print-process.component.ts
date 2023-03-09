import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-process',
  templateUrl: './print-process.component.html',
  styleUrls: ['./print-process.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrintProcessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
