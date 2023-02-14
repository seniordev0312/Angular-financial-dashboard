import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { PayableModel } from '../../model/payable.model';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
import { VendorInvoiceComponent } from '../vendor-invoice/vendor-invoice.component';

@Component({
  selector: 'app-accounts-payable',
  templateUrl: './accounts-payable.component.html',
  styleUrls: ['./accounts-payable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsPayableComponent implements OnInit {
  startDateFormControl = new FormControl();
  endDateFormControl = new FormControl();
  payableList: PayableModel[] = [];

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<PayableModel>;

  constructor(
    private layoutService: LayoutService,
    private dialog: MatDialog,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.AccountsPayable,
          translationKey:
            'accounting-add-finance.accounts-payable.accounts-payable',
        },
      ],
    });

    this.payableList = [
      {
        id: 0,
        ein: '779722',
        name: 'Taanayel Hospital',
        currency: 'USD',
        amount: 21592.0,
        amountnotdue: 12100.0,
      },
      {
        id: 1,
        ein: '123',
        name: 'Taanayel 1',
        currency: 'USD',
        amount: 21592.0,
        amountnotdue: 12100.0,
      },
      {
        id: 2,
        ein: '456',
        name: 'Taanayel 2',
        currency: 'USD',
        amount: 21592.0,
        amountnotdue: 12100.0,
      },
    ];

    this.tableConfiguration.data = this.payableList;
    this.tableConfiguration.dataCount = this.payableList.length;
    this.cdr.detectChanges();
    this.table.refresh();
  }

  openAddingPayment() {
    this.dialog.open(AddPaymentComponent, {
      width: '90%',
      height: '75%',
    });
  }

  openPayableStatus() {
    this.router.navigate(
      [
        `${ApplicationRoutes.PayableStatus}`,
        {
          outlets: {
            sidenav: 'accounts-payable/payable-status',
          },
        },
      ],
      { skipLocationChange: true }
    );
  }

  tableColumns: TableColumn[] = [
    {
      translationKey: 'ein',
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
      translationKey: 'name',
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
      translationKey: 'currency',
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
      translationKey: 'amount',
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
      translationKey: 'amountnotdue',
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

  pageSize = 15;

  tableSettings = new TableSettings({
    actionsMode: 'inline',
    pageSize: this.pageSize,
    isLocalPaging: true,
    isRowSelectable: true,
    enableCustomizingColumns: true,
  });

  tableConfiguration: TableConfiguration<PayableModel> = {
    tableRowsActionsList: [],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };

  onRowSelection(data: any) {
    console.log('1111111111', data);

    this.dialog.open(VendorInvoiceComponent, {
      width: '90%',
      height: '90%',
    });
  }

  payableStatusClick() {
    this.router.navigate([
      `${ApplicationRoutes.AccountsPayable}/${ApplicationRoutes.PayableStatus}`,
    ]);
  }
}
