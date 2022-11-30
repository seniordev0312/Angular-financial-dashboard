import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-insurance-underwriting',
  templateUrl: './general-insurance-underwriting.component.html',
  styleUrls: ['./general-insurance-underwriting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralInsuranceUnderwritingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
