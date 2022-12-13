import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-policy-information',
  templateUrl: './policy-information.component.html',
  styleUrls: ['./policy-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolicyInformationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
