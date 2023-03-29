import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { DepositModel } from '../../model/deposit.model';

@Component({
  selector: 'app-view-deposited-history',
  templateUrl: './view-deposited-history.component.html',
  styleUrls: ['./view-deposited-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewDepositedHistoryComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}

  depositHistory: DepositModel[] = [
    {
      id: 1,
      dateFrom: '03/24/2022',
      dateTo: '03/24/2022',
      bankName: 'Audi',
      currency: 'USD',
      amount: 1500,
      status: 'Deposited',
    },
    {
      id: 2,
      dateFrom: '03/24/2022',
      dateTo: '03/24/2022',
      bankName: 'Audi',
      currency: 'USD',
      amount: 1500,
      status: 'Deposited',
    },
    {
      id: 3,
      dateFrom: '03/24/2022',
      dateTo: '03/24/2022',
      bankName: 'Audi',
      currency: 'USD',
      amount: 1500,
      status: 'Deposited',
    },
    {
      id: 4,
      dateFrom: '03/24/2022',
      dateTo: '03/24/2022',
      bankName: 'Audi',
      currency: 'USD',
      amount: 1500,
      status: 'Deposited',
    },
    {
      id: 5,
      dateFrom: '03/24/2022',
      dateTo: '03/24/2022',
      bankName: 'Audi',
      currency: 'USD',
      amount: 1500,
      status: 'Deposited',
    },
    {
      id: 6,
      dateFrom: '03/24/2022',
      dateTo: '03/24/2022',
      bankName: 'Audi',
      currency: 'USD',
      amount: 1500,
      status: 'Deposited',
    },
  ];

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<DepositModel>;

  ngOnInit(): void {
    this.tableConfiguration.data = this.depositHistory;
    this.tableConfiguration.dataCount = this.depositHistory.length;
    this.cdr.detectChanges();
    this.table.refresh();
  }

  tableColumns: TableColumn[] = [
    {
      translationKey: 'CheckNo',
      property: 'id',
      type: 'number',
      svgIcon: '',
      cssClasses: () => '',
      dataCssClasses: () => 'ml-[30%]',
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
      translationKey: 'Date From',
      property: 'dateFrom',
      type: 'text',
      cssClasses: () => '',
      dataCssClasses: () => 'ml-[10%]',
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
      translationKey: 'Date To',
      property: 'dateTo',
      type: 'text',
      cssClasses: () => '',
      dataCssClasses: () => 'ml-[10%]',
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
      translationKey: 'Bank Name',
      property: 'bankName',
      type: 'text',
      cssClasses: () => '',
      dataCssClasses: () => 'ml-[30%]',
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
      dataCssClasses: () => 'ml-[30%]',
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
      dataCssClasses: () => 'ml-[30%]',
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
      type: 'text',
      cssClasses: () => 'text-center',
      dataCssClasses: () => 'ml-[10%]',
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
    isRowSelectable: true,
    enableActions: false,
    enableCustomizingColumns: true,
    isRowsSelectionAvailable: true,
    isRowHeaderSeclectionAvailable: false,
  });

  tableConfiguration: TableConfiguration<DepositModel> = {
    tableRowsActionsList: [],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };
}
