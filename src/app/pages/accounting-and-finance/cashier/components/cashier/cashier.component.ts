import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { CashierModel } from '../../model/casher.model';

import { MatDialog } from '@angular/material/dialog';
import { TillViewComponent } from '../till-view/till-view.component';
import { ViewBasketComponent } from '../view-basket/view-basket.component';
import { ImportBasketComponent } from '../import-basket/import-basket.component';
// import { NewTransactionComponent } from '../new-transaction/new-transaction.component';
import { OtherMakePaymentComponent } from '../other-make-payment/other-make-payment.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-cashier',
  templateUrl: './cashier.component.html',
  styleUrls: ['./cashier.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CashierComponent implements OnInit {
  cashierList: CashierModel[] = [];
  issueFrom: Date;
  issueTo: Date;
  expiryFrom: Date;
  expiryTo: Date;

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<CashierModel>;

  constructor(
    private layoutService: LayoutService,
    private cdr: ChangeDetectorRef,
    private dialog1: MatDialog,
    private dialog: MatDialog
  ) {}
    private cdr: ChangeDetectorRef,
    private dialog2: MatDialog
  ) { }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.Cashier,
          translationKey: 'accounting-add-finance.cashier.cashier',
        },
      ],
    });

    this.cashierList = [
      {
        id: 0,
        ein: '047972210',
        name: 'Mohamad Al Srouji',
        commission: 300.0,
        status: 'Good',
        currency: 'USD',
        ytd: 3000.0,
        premiumdue: 3000.0,
        duedate: '11/05/2022',
      },
      {
        id: 1,
        ein: '047972210',
        name: 'Mohamad Al Srouji',
        commission: 300.0,
        status: '30 daysoverdue',
        currency: 'USD',
        ytd: 3000.0,
        premiumdue: 3000.0,
        duedate: '11/05/2022',
      },
      {
        id: 2,
        ein: '047972210',
        name: 'Mohamad Al Srouji',
        commission: 300.0,
        status: '60 days Overdue',
        currency: 'USD',
        ytd: 3000.0,
        premiumdue: 3000.0,
        duedate: '11/05/2022',
      },
      {
        id: 3,
        ein: '047972210',
        name: 'Mohamad Al Srouji',
        commission: 300.0,
        status: 'Requires Provision',
        currency: 'USD',
        ytd: 3000.0,
        premiumdue: 3000.0,
        duedate: '11/05/2022',
      },
    ];

    this.tableConfiguration.data = this.cashierList;
    this.tableConfiguration.dataCount = this.cashierList.length;
    this.cdr.detectChanges();
    this.table.refresh();
  }

  openTillModal() {
    this.dialog2.open(TillViewComponent, {
      height: '75%',
      width: '80%',
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
      translationKey: 'Commission',
      property: 'commission',
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
      translationKey: 'High on Account YTD',
      property: 'ytd',
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
      translationKey: 'Current Premiums Due',
      property: 'premiumdue',
      type: 'number',
      cssClasses: () => 'pr-2',
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
      cssClasses: () => 'pr-2',
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
    enableCustomizingColumns: true,
    isRowsSelectionAvailable: true,
  });

  tableConfiguration: TableConfiguration<CashierModel> = {
    tableRowsActionsList: [],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };
  openViewBusket() {
    this.dialog1.open(ViewBasketComponent, {
      width: '90%',
      height: '80%',
    });
  }

  searchField() {
    console.log(this.issueFrom);
    console.log(this.issueTo);
    console.log(this.expiryFrom);
    console.log(this.expiryTo);
    this.cashierList = this.cashierList.filter(
      (list) =>
        new Date(list.duedate) > this.issueFrom &&
        new Date(list.duedate) < this.issueTo
    );
    this.tableConfiguration.data = this.cashierList;
    this.tableConfiguration.dataCount = this.cashierList.length;
    this.cdr.detectChanges();
    this.table.refresh();
  }

  openBasketModal() {
    this.dialog.open(ImportBasketComponent, {
      width: '30%',
      height: '70%',
    });
  }

  openTransactionModal() {
    // this.dialog.open(NewTransactionComponent, {
    //   width: '90%',
    //   height: '80%',
    // });
    this.dialog.open(OtherMakePaymentComponent, {
      width: '90%',
      height: '80%',
    });
  }
}
