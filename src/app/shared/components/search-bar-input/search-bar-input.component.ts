import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar-input',
  templateUrl: './search-bar-input.component.html',
  styleUrls: ['./search-bar-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarInputComponent implements OnInit {
  search: String = '';

  constructor() {}

  ngOnInit(): void {}
}
