import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-check-process',
  templateUrl: './check-process.component.html',
  styleUrls: ['./check-process.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckProcessComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
