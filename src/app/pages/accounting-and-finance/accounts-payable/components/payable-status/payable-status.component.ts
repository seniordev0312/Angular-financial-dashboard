import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { PayableModel } from '../../model/payable.model';

@Component({
  selector: 'app-payable-status',
  templateUrl: './payable-status.component.html',
  styleUrls: ['./payable-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayableStatusComponent implements OnInit {
  checksImage: string =
    '../../../../../../assets/images/accounting-payable/checks.png';
  wireTransferImage: string =
    '../../../../../../assets/images/accounting-payable/wire-transfer.png';

  payableList: PayableModel[] = [
    {
      ein: '779722',
      name: 'Taanayel Hospital',
      currency: 'USD',
      amount: 21592.0,
      amountnotdue: 12100.0,
    },
    {
      ein: '779722',
      name: 'Taanayel Hospital',
      currency: 'USD',
      amount: 21592.0,
      amountnotdue: 12100.0,
    },
    {
      ein: '779722',
      name: 'Taanayel Hospital',
      currency: 'USD',
      amount: 21592.0,
      amountnotdue: 12100.0,
    },
  ];

  tab: number = 1;

  constructor() {}

  ngOnInit(): void {}

  tableColumns: TableColumn[] = [
    {
      translationKey: 'EIN',
      property: 'ein',
      type: 'text',
      svgIcon: '',
      cssClasses: () => '',
      dataCssClasses: () => 'underline text-accent',
      enableSort: true,
      hasFilter: true,
      visible: true,
      displayInFilterList: false,
      hasToolTip: false,
      showText: true,
      filter: {
        filterType: TableColumnFilterDataType.Text,
      },
    },
    {
      translationKey: 'Name',
      property: 'name',
      type: 'text',
      cssClasses: () => '',
      dataCssClasses: () => '',
      enableSort: true,
      hasFilter: true,
      visible: true,
      displayInFilterList: true,
      hasToolTip: false,
      showText: true,
      filter: {
        filterType: TableColumnFilterDataType.Text,
      },
    },
    {
      translationKey: 'Currency',
      property: 'currency',
      type: 'text',
      cssClasses: () => '',
      dataCssClasses: () => '',
      enableSort: true,
      hasFilter: true,
      visible: true,
      displayInFilterList: true,
      hasToolTip: false,
      showText: true,
      filter: {
        filterType: TableColumnFilterDataType.Text,
      },
    },
    {
      translationKey: 'Amount',
      property: 'amount',
      type: 'number',
      cssClasses: () => '',
      dataCssClasses: () => '',
      enableSort: true,
      hasFilter: true,
      visible: true,
      displayInFilterList: true,
      hasToolTip: false,
      showText: true,
      filter: {
        filterType: TableColumnFilterDataType.Text,
      },
    },
    {
      translationKey: 'Amount Not Due',
      property: 'amountnotdue',
      type: 'number',
      cssClasses: () => '',
      dataCssClasses: () => '',
      enableSort: true,
      hasFilter: true,
      visible: true,
      displayInFilterList: true,
      hasToolTip: false,
      showText: true,
      filter: {
        filterType: TableColumnFilterDataType.Text,
      },
    },
  ];

  pageSize = 15;

  tableSettings = new TableSettings({
    actionsMode: 'inline',
    pageSize: this.pageSize,
    isLocalPaging: true,
  });

  tableConfiguration: TableConfiguration<PayableModel> = {
    tableRowsActionsList: [],
    columns: this.tableColumns,
    data: this.payableList,
    dataCount: null,
    settings: this.tableSettings,
  };

  tabSelection(currentTab: number): void {
    this.tab = currentTab;
  }
}
