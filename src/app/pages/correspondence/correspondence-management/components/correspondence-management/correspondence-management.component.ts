import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-correspondence-management',
  templateUrl: './correspondence-management.component.html',
  styleUrls: ['./correspondence-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CorrespondenceManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
