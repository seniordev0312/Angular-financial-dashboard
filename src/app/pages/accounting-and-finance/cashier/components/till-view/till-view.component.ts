import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
// import { BookType } from 'xlsx';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { TillModel } from '../../model/till.model';

@Component({
  selector: 'app-till-view',
  templateUrl: './till-view.component.html',
  styleUrls: ['./till-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TillViewComponent implements OnInit {
  currencyList = [{ id: 1, value: 'LBP' }];
  checkSection: boolean = true;
  checkFontColor: string;
  cashFontColor: string;
  checkFontColors: string[] = ['', 'text-[#365D7D]'];
  cashFontColors: string[] = ['', 'text-[#365D7D]'];
  additionalCurrency: boolean = false;
  viewCurrencyDetail: boolean = false;
  currentCurrency: string;
  currency: number = 1;
  tillHistory: TillModel[] = [];

  @ViewChild(WidgetTableComponent)
  managementDiaglog: boolean = true;
  constructor() {}

  ngOnInit(): void {
    this.checkFontColor = this.checkFontColors[1];
    this.cashFontColor = this.cashFontColors[0];

    this.tillHistory = [
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
  }

  tableColumns: TableColumn[] = [
    {
      translationKey: 'Check No',
      property: 'id',
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
        filterType: TableColumnFilterDataType.Text,
      },
    },
    {
      translationKey: 'Bank Name',
      property: 'bankName',
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

  managmentTill() {
    console.log(1);
    this.managementDiaglog = false;
  }

  changeStatus(status: string) {
    console.log(status);
    //   if ((status = 'check')) {
    //     this.checkSection = true;
    //     this.checkFontColor = this.checkFontColors[1];
    //     this.cashFontColor = this.cashFontColors[0];
    //   } else {
    //     this.checkSection = false;
    //     this.checkFontColor = this.checkFontColors[0];
    //     this.cashFontColor = this.cashFontColors[1];
    //   }
  }
  addCurrency() {
    this.currencyList.push({
      id: 2,
      value: 'USD',
    });
    // this.viewCurrencyDetail = true;
    this.additionalCurrency = true;
    console.log(this.additionalCurrency);
  }
}
