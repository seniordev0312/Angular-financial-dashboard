import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-right-side-bar',
  templateUrl: './right-side-bar.component.html',
  styleUrls: ['./right-side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightSideBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
