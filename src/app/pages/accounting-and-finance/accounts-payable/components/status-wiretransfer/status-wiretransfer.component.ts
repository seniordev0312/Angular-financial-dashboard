import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { WireTransferModel } from '../../model/wire-transfer.model';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';

@Component({
  selector: 'app-status-wiretransfer',
  templateUrl: './status-wiretransfer.component.html',
  styleUrls: ['./status-wiretransfer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatusWiretransferComponent implements OnInit {
  wireTransferList: WireTransferModel[] = [
    {
      id: 0,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'pending',
    },
    {
      id: 1,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'pending',
    },
    {
      id: 2,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'pending',
    },
    {
      id: 3,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'pending',
    },
    {
      id: 4,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'pending',
    },
    {
      id: 5,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'pending',
    },
    {
      id: 6,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'pending',
    },
    {
      id: 7,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'pending',
    },
    {
      id: 8,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'pending',
    },
    {
      id: 9,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'pending',
    },
  ];

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<WireTransferModel>;

  constructor(private cdr: ChangeDetectorRef) {}

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
  ];

  pageSize = 15;

  tableSettings = new TableSettings({
    actionsMode: 'inline',
    pageSize: this.pageSize,
    isLocalPaging: true,
  });

  tableConfiguration: TableConfiguration<WireTransferModel> = {
    tableRowsActionsList: [],
    columns: this.tableColumns,
    data: [],
    dataCount: null,
    settings: this.tableSettings,
  };

  ngOnInit(): void {
    this.tableConfiguration.data = this.wireTransferList;
    this.tableConfiguration.dataCount = this.wireTransferList.length;
    this.cdr.detectChanges();
    this.table.refresh();
  }
}
