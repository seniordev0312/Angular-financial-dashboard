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
import { TillModel } from '../../model/till.model';
@Component({
  selector: 'app-cash-till-history',
  templateUrl: './cash-till-history.component.html',
  styleUrls: ['./cash-till-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashTillHistoryComponent implements OnInit {
  constructor(private cdr: ChangeDetectorRef) {}
  tillHistory: TillModel[] = [];

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<TillModel>;

  ngOnInit(): void {
    this.tillHistory = [
      {
        id: 1234,
        date: '03/24/2022',
        bankName: 'Audi',
        currency: 'USD',
        amount: 1500,
        status: 'Till',
      },
      {
        id: 534,
        date: '03/24/2022',
        bankName: 'Audi',
        currency: 'USD',
        amount: 1500,
        status: 'In Transit',
      },
    ];

    this.tableConfiguration.data = this.tillHistory;
    this.tableConfiguration.dataCount = this.tillHistory.length;
    this.cdr.detectChanges();
    this.table.refresh();
  }

  tableColumns: TableColumn[] = [
    {
      translationKey: 'Bundle No',
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
      translationKey: 'Date',
      property: 'date',
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
  });

  tableConfiguration: TableConfiguration<TillModel> = {
    tableRowsActionsList: [],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };
}
