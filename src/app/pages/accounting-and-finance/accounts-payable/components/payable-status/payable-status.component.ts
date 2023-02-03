import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { PayableModel } from '../../model/payable.model';
import { WireTransferModel } from '../../model/wire-transfer.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-payable-status',
  templateUrl: './payable-status.component.html',
  styleUrls: ['./payable-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayableStatusComponent implements OnInit {
  checksImage: string =
    '../../../../../../assets/images/accounting-payable/Checks.png';
  wireTransferImage: string =
    '../../../../../../assets/images/accounting-payable/wire-transfer.png';

  payableList: PayableModel[] = [
    {
      id: 1,
      ein: '7797221',
      name: 'Taanayel Hospital1',
      currency: 'USD',
      amount: 215921.0,
      amountnotdue: 121001.0,
    },
    {
      id: 2,
      ein: '7797222',
      name: 'Taanayel Hospital2',
      currency: 'USD',
      amount: 215922.0,
      amountnotdue: 121002.0,
    },
    {
      id: 3,
      ein: '7797223',
      name: 'Taanayel Hospital3',
      currency: 'USD',
      amount: 215923.0,
      amountnotdue: 121003.0,
    },
  ];

  tab: number = 1;

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.AccountsPayable,
          translationKey:
            'accounting-add-finance.accounts-payable.accounts-payable',
        },
        {
          route: ApplicationRoutes.PayableStatus,
          translationKey: 'Payable Status',
        },
      ],
    });
  }

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

  tableColumns1: TableColumn[] = [
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
      translationKey: 'Date',
      property: 'date',
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
        filterType: TableColumnFilterDataType.Date,
      },
    },
    {
      translationKey: 'Ref No',
      property: 'refno',
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
      translationKey: 'Currency',
      property: 'currency',
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
      translationKey: 'Status',
      property: 'status',
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
    data: [],
    dataCount: null,
    settings: this.tableSettings,
  };

  tableConfiguration1: TableConfiguration<WireTransferModel> = {
    tableRowsActionsList: [],
    columns: this.tableColumns1,
    data: [],
    dataCount: null,
    settings: this.tableSettings,
  };

  tabSelection(currentTab: number): void {
    this.tab = currentTab;
  }
}
