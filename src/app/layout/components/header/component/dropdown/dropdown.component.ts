import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnInit {

  list: any[] = [{
    label: 'Set Profile',
    icon: 'user-profile',
    value: 'SetProfile ',
  }, {
    label: 'Set Language',
    icon: 'language',
    value: 'SetLanguage',
  }, {
    label: 'Sign out',
    icon: 'logout',
    value: 'SignOut',
  }]
  constructor() { }

  ngOnInit(): void {
  }

  onChange(_event: any): void {
  }
}
