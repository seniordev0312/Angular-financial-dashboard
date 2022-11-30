import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-structure',
  templateUrl: './company-structure.component.html',
  styleUrls: ['./company-structure.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanyStructureComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
