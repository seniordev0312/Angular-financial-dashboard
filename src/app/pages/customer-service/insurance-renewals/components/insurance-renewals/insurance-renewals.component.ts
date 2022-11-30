import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-insurance-renewals',
  templateUrl: './insurance-renewals.component.html',
  styleUrls: ['./insurance-renewals.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsuranceRenewalsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
