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
import { ReceivableModel } from '../../model/receivable.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-accounts-receivable',
  templateUrl: './accounts-receivable.component.html',
  styleUrls: ['./accounts-receivable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsReceivableComponent implements OnInit {
  receivableList: ReceivableModel[] = [];

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<ReceivableModel>;

  constructor(
    private layoutService: LayoutService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.AccountsReceivable,
          translationKey:
            'accounting-add-finance.accounts-receivable.accounts-receivable',
        },
      ],
    });
    this.receivableList = [
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
        status: 'Good',
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
        status: 'Good',
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
        status: 'Good',
        currency: 'USD',
        ytd: 3000.0,
        premiumdue: 3000.0,
        duedate: '11/05/2022',
      },
    ];

    this.tableConfiguration.data = this.receivableList;
    this.tableConfiguration.dataCount = this.receivableList.length;
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
  });

  tableConfiguration: TableConfiguration<ReceivableModel> = {
    tableRowsActionsList: [],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };
}
