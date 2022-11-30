import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-system-claims',
  templateUrl: './system-claims.component.html',
  styleUrls: ['./system-claims.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemClaimsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
