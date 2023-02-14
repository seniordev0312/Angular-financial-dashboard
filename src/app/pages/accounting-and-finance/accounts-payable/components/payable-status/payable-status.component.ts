import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableRowAction } from '@root/shared/models/table/table-row-action.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { PayableStatusModel } from '../../model/payable-status.model';
import { WireTransferModel } from '../../model/wire-transfer.model';
import { PrintStatusComponent } from '../print-status/print-status.component';
import { VoidActionComponent } from '../void-action/void-action.component';

@Component({
  selector: 'app-payable-status',
  templateUrl: './payable-status.component.html',
  styleUrls: ['./payable-status.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayableStatusComponent implements OnInit {
  checksImage: string =
    '../../../../../../assets/images/accounting-payable/Checks.png';
  clickedChecksImage: string =
    '../../../../../../assets/images/accounting-payable/Checks-clicked.png';
  wireTransferImage: string =
    '../../../../../../assets/images/accounting-payable/wire-transfer.png';
  clickedWireTransferImage: string =
    '../../../../../../assets/images/accounting-payable/wire-transfer-clicked.png';

  payableList: PayableStatusModel[] = [
    {
      id: 1,
      ein: '7797221',
      name: 'Taanayel Hospital1',
      date: '11-03-2022',
      checkno: 123,
      currency: 'USD',
      amount: 215921.0,
      status: 'Pending',
    },
    {
      id: 2,
      ein: '7797222',
      name: 'Taanayel Hospital2',
      date: '11-03-2022',
      checkno: 123,
      currency: 'USD',
      amount: 215922.0,
      status: 'Authorized',
    },
    {
      id: 3,
      ein: '7797223',
      name: 'Taanayel Hospital3',
      date: '11-03-2022',
      checkno: 123,
      currency: 'USD',
      amount: 215923.0,
      status: 'Rejected',
    },
  ];

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

  tab: number = 1;

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<PayableStatusModel>;

  @ViewChild(WidgetTableComponent)
  table1: WidgetTableComponent<WireTransferModel>;

  constructor(
    private layoutService: LayoutService,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog
  ) {}

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

    if (this.tab === 0) {
      this.wireTransferImage =
        '../../../../../../assets/images/accounting-payable/wire-transfer-clicked.png';
      this.checksImage =
        '../../../../../../assets/images/accounting-payable/Checks.png';
    } else {
      this.wireTransferImage =
        '../../../../../../assets/images/accounting-payable/wire-transfer.png';
      this.checksImage =
        '../../../../../../assets/images/accounting-payable/Checks-clicked.png';
    }

    this.tableConfiguration.data = this.payableList;
    this.tableConfiguration.dataCount = this.payableList.length;
    this.cdr.detectChanges();
    this.table.refresh();
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
      translationKey: 'Check No',
      property: 'checkno',
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

  printAction: TableRowAction<PayableStatusModel> = {
    action: (data) => {
      console.log(data);
      this.dialog.open(PrintStatusComponent, {
        width: '70%',
        height: '95%',
        data: data,
      });
    },
    cssClasses: 'text-black',
    iconName: 'print',
    translationKey: '',
    alwaysShow: false,
    showConditionProperty: null,
    isIconButton: true,
  };

  voidAction: TableRowAction<PayableStatusModel> = {
    action: (data) => {
      console.log(data);
      this.dialog.open(VoidActionComponent, {
        width: '70%',
        height: '95%',
        data: data,
      });
    },
    cssClasses: 'text-black',
    iconName: 'assignment',
    translationKey: '',
    alwaysShow: false,
    showConditionProperty: null,
    isIconButton: true,
  };

  pageSize = 15;

  tableSettings = new TableSettings({
    actionsMode: 'inline',
    pageSize: this.pageSize,
    isLocalPaging: true,
  });

  tableConfiguration: TableConfiguration<PayableStatusModel> = {
    tableRowsActionsList: [this.printAction, this.voidAction],
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
