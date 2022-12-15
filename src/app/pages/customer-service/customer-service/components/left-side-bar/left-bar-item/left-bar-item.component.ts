import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-left-bar-item',
  templateUrl: './left-bar-item.component.html',
  styleUrls: ['./left-bar-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftBarItemComponent implements OnInit {
  @Input() value: string

  constructor() { }

  ngOnInit(): void {
  }

}
