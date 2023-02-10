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
import { TableRowAction } from '@root/shared/models/table/table-row-action.model';
import { MatDialog } from '@angular/material/dialog';
import { PrintStatusComponent } from '../print-status/print-status.component';

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
      status: 'Pending',
    },
    {
      id: 1,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'Pending',
    },
    {
      id: 2,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'Pending',
    },
    {
      id: 3,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'Authorized',
    },
    {
      id: 4,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'Pending',
    },
    {
      id: 5,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'Authorized',
    },
    {
      id: 6,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'Pending',
    },
    {
      id: 7,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'Rejected',
    },
    {
      id: 8,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'Pending',
    },
    {
      id: 9,
      ein: '0779722',
      name: 'Taanayel Hospital',
      date: '01/2022',
      refno: 1234,
      currency: 'USD',
      amount: 21592.0,
      status: 'Resolved',
    },
  ];

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<WireTransferModel>;

  constructor(private cdr: ChangeDetectorRef, public dialog: MatDialog) {}

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

  editAction: TableRowAction<WireTransferModel> = {
    action: () => {
      this.dialog.open(PrintStatusComponent, {
        width: '70%',
        height: '95%',
      });
    },
    cssClasses: 'text-black',
    iconName: 'edit',
    translationKey: '',
    alwaysShow: false,
    showConditionProperty: null,
    isIconButton: true,
  };

  processAction: TableRowAction<WireTransferModel> = {
    action: () => {
      this.dialog.open(PrintStatusComponent, {
        width: '70%',
        height: '95%',
      });
    },
    cssClasses: 'text-black',
    iconName: 'cached',
    translationKey: '',
    alwaysShow: false,
    showConditionProperty: null,
    isIconButton: true,
  };

  tableConfiguration: TableConfiguration<WireTransferModel> = {
    tableRowsActionsList: [this.editAction, this.processAction],
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
