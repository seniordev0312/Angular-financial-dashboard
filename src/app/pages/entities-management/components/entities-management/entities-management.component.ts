import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entities-management',
  templateUrl: './entities-management.component.html',
  styleUrls: ['./entities-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesManagementComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
