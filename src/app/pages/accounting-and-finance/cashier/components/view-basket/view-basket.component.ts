import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { VendorInvoiceModel } from '@root/pages/accounting-and-finance/accounts-payable/model/vendor-invoice.model';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { AdvancePaymentModel } from '@root/pages/accounting-and-finance/accounts-payable/model/advance-payment.model';

@Component({
  selector: 'app-view-basket',
  templateUrl: './view-basket.component.html',
  styleUrls: ['./view-basket.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewBasketComponent implements OnInit {
  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<VendorInvoiceModel>;
  table1: WidgetTableComponent<AdvancePaymentModel>;
  invoicelist: VendorInvoiceModel[] = [];
  paymentlist: AdvancePaymentModel[] = [];
  dueUnPaidPrice: number;
  totalSelected: number;
  // dueUnPaidPrice1: number;
  paymentStatusFlag: boolean = true;

  constructor(private cdr: ChangeDetectorRef) {}

  changePaymentStatus() {
    this.paymentStatusFlag = !this.paymentStatusFlag;
  }

  ngOnInit(): void {
    // console.log(this.dueUnPaidPrice1);
    this.invoicelist = [
      {
        id: 1,
        policyno: 'MGW96389',
        name: 'Ali',
        duedate: '07/15/2022',
        totalunpaiddue: 1400.0,
        totalunpaidnotdue: 4850.0,
        currency: 'USD',
        invoicetype: '',
        custom: 1400,
      },
      {
        id: 2,
        policyno: 'MGW96389',
        name: 'Ali',
        duedate: '07/15/2022',
        totalunpaiddue: 1400.0,
        totalunpaidnotdue: 4850.0,
        currency: 'USD',
        invoicetype: '',
        custom: 4000,
      },
      {
        id: 3,
        policyno: 'MGW96389',
        name: 'Ali',
        duedate: '07/15/2022',
        totalunpaiddue: 1400.0,
        totalunpaidnotdue: 4850.0,
        currency: 'USD',
        invoicetype: '',
        custom: 6000,
      },
      {
        id: 4,
        policyno: 'MGW96389',
        name: 'Ali',
        duedate: '07/15/2022',
        totalunpaiddue: 1400.0,
        totalunpaidnotdue: 4850.0,
        currency: 'USD',
        invoicetype: '',
        custom: 400,
      },
    ];

    this.tableConfiguration.data = this.invoicelist;
    console.log(this.invoicelist);
    this.tableConfiguration.dataCount = this.invoicelist.length;
    this.cdr.detectChanges();
    this.table.refresh();
  }

  tableColumns: TableColumn[] = [
    {
      translationKey: 'Policy No',
      property: 'policyno',
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
      translationKey: 'Due Date',
      property: 'duedate',
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
      translationKey: 'Total Unpaid Due',
      property: 'totalunpaiddue',
      type: 'number',
      cssClasses: () => '',
      dataCssClasses: () => '',
      enableSort: true,
      editable: true,
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
      translationKey: 'Total Unpaid Not Due',
      property: 'totalunpaidnotdue',
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
      translationKey: 'Invoice Type',
      property: 'invoicetype',
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
      translationKey: 'Custome',
      property: 'custom',
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
    pageSize: this.pageSize,
    isLocalPaging: true,
    enableTrash: true,
  });

  tableConfiguration: TableConfiguration<VendorInvoiceModel> = {
    tableRowsActionsList: [],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };
}
