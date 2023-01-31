import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { PayableModel } from '../../model/payable.model';
import { AddPaymentComponent } from '../add-payment/add-payment.component';
// import { PayableStatusComponent } from '../payable-status/payable-status.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accounts-payable',
  templateUrl: './accounts-payable.component.html',
  styleUrls: ['./accounts-payable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsPayableComponent implements OnInit {
  startDateFormControl = new FormControl();
  endDateFormControl = new FormControl();
  payableList: PayableModel[] = [
    {
      ein: '779722',
      name: 'Taanayel Hospital',
      currency: 'USD',
      amount: 21592.0,
      amountnotdue: 12100.0,
    },
    {
      ein: '779722',
      name: 'Taanayel Hospital',
      currency: 'USD',
      amount: 21592.0,
      amountnotdue: 12100.0,
    },
    {
      ein: '779722',
      name: 'Taanayel Hospital',
      currency: 'USD',
      amount: 21592.0,
      amountnotdue: 12100.0,
    },
  ];

  constructor(
    private layoutService: LayoutService,
    private dialog: MatDialog,
    private router: Router
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
  }

  openAddingPayment() {
    this.dialog.open(AddPaymentComponent, {
      width: '90%',
      height: '60%',
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
      translationKey: 'Amount Not Due',
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
  });

  tableConfiguration: TableConfiguration<PayableModel> = {
    tableRowsActionsList: [],
    columns: this.tableColumns,
    data: this.payableList,
    dataCount: null,
    settings: this.tableSettings,
  };
}
