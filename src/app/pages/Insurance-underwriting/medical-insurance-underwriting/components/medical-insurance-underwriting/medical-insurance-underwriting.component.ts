import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-medical-insurance-underwriting',
  templateUrl: './medical-insurance-underwriting.component.html',
  styleUrls: ['./medical-insurance-underwriting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MedicalInsuranceUnderwritingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
