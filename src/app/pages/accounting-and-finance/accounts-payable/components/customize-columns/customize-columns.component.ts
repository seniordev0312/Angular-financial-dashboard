import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CustomizeColumnModel } from '../../model/customize-column.model';

@Component({
  selector: 'app-customize-columns',
  templateUrl: './customize-columns.component.html',
  styleUrls: ['./customize-columns.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomizeColumnsComponent implements OnInit {
  Columns: CustomizeColumnModel[] = [
    { name: 'Agent', completed: false },
    { name: 'Name', completed: false },
    { name: 'Commission', completed: false },
    { name: 'Issue Date', completed: false },
    { name: 'Currency', completed: false },
    { name: 'Account Balance', completed: false },
    { name: 'Status', completed: false },
    { name: 'Due Date', completed: false },
    { name: 'Outstanding', completed: false },
    { name: 'Due Date', completed: false },
    { name: 'Type', completed: false },
    { name: 'Add Total Row', completed: false },
    { name: 'Total Unpaid Due', completed: false },
    { name: 'Total Unpaid Not Due', completed: false },
    { name: 'Status', completed: false },
  ];

  constructor() {}

  ngOnInit(): void {}
}
