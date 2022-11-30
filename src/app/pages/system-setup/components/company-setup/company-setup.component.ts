import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrls: ['./company-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanySetupComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
