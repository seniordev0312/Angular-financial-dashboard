import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-life-insurance-underwriting',
  templateUrl: './life-insurance-underwriting.component.html',
  styleUrls: ['./life-insurance-underwriting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LifeInsuranceUnderwritingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
