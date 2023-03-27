import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnChanges,
  ViewChild,
  ChangeDetectorRef,
  SimpleChanges,
} from '@angular/core';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { TillModel } from '../../model/till.model';

@Component({
  selector: 'app-till-history',
  templateUrl: './till-history.component.html',
  styleUrls: ['./till-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TillHistoryComponent implements OnInit, OnChanges {
  constructor(private cdr: ChangeDetectorRef) {}
  // tillHistory: [] = [];
  tillHistory: TillModel[] = [
    {
      id: 1,
      date: '03/24/2022',
      bankName: 'Audi',
      currency: 'USD',
      amount: 1500,
      status: 'Till',
    },
    {
      id: 2,
      date: '03/24/2022',
      bankName: 'Audi',
      currency: 'USD',
      amount: 1500,
      status: 'Transit',
    },
    {
      id: 3,
      date: '03/24/2022',
      bankName: 'Audi',
      currency: 'USD',
      amount: 1500,
      status: 'Till',
    },
    {
      id: 4,
      date: '03/24/2022',
      bankName: 'Audi',
      currency: 'USD',
      amount: 1500,
      status: 'Transit',
    },
    {
      id: 5,
      date: '03/24/2022',
      bankName: 'Audi',
      currency: 'USD',
      amount: 1500,
      status: 'Till',
    },
    {
      id: 6,
      date: '03/24/2022',
      bankName: 'Audi',
      currency: 'USD',
      amount: 1500,
      status: 'Transit',
    },
  ];

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<TillModel>;

  ngOnInit(): void {
    this.tableConfiguration.data = this.tillHistory;
    this.tableConfiguration.dataCount = this.tillHistory.length;
    this.cdr.detectChanges();
    this.table.refresh();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
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
    isRowHeaderSeclectionAvailable: false,
  });

  tableConfiguration: TableConfiguration<TillModel> = {
    tableRowsActionsList: [],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };

  onRowSelection(data: any) {
    if (!data.status) {
      this.tableSettings.isRowHeaderSeclectionAvailable = false;
    } else {
      console.log(this.tableSettings.isRowHeaderSeclectionAvailable);
      this.tableSettings.isRowHeaderSeclectionAvailable = true;
    }
  }
}
