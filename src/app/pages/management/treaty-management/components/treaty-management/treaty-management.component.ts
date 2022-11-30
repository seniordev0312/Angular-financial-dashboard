import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-treaty-management',
  templateUrl: './treaty-management.component.html',
  styleUrls: ['./treaty-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreatyManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
