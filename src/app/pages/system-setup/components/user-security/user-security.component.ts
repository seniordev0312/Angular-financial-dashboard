import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html',
  styleUrls: ['./user-security.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSecurityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
