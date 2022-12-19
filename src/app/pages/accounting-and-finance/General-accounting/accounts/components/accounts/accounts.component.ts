import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { GeneralAccountingService } from '../../../general-accounting/general-accounting.service';
import { JournalModel } from '../../../general-accounting/model/journal.model';
import { AccountModel } from '../../model/accounts.model';


@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountsComponent implements OnInit {

  constructor(private layoutService: LayoutService, private generalAccountingService: GeneralAccountingService, private cdr: ChangeDetectorRef,) {
  }
  startDateFormControl = new FormControl();
  endDateFormControl = new FormControl();
  pipe = new DatePipe('en-US');
  journalList: JournalModel[] = [];
  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<JournalModel>;
  localAccount: AccountModel;
  accountOpenBalance: number = 0;
  accountCloseBalance: number = 0;

  ngOnInit(): void {

    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.GeneralAccounting,
          translationKey: 'accounting-add-finance.general-accounting.general-accounting'
        },
        {
          route: ApplicationRoutes.Accounts,
          translationKey: 'Accounts'
        },
      ],
    });
  }

  tableColumns: TableColumn[] = [
    {
      translationKey: 'Posting Date',
      property: 'postingDate',
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
        filterType: TableColumnFilterDataType.Date
      }
    },
    {
      translationKey: 'Account',
      property: 'accountName',
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
        filterType: TableColumnFilterDataType.Text
      }
    },
    {
      translationKey: 'Doc No.',
      property: 'documentNumber',
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
        filterType: TableColumnFilterDataType.Text
      }
    },
    {
      translationKey: 'Ref No.',
      property: 'reference',
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
        filterType: TableColumnFilterDataType.Text
      }
    },
    {
      translationKey: 'Debit.',
      property: 'debit',
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
        filterType: TableColumnFilterDataType.Text
      }
    },
    {
      translationKey: 'Credit',
      property: 'credit',
      type: 'text',
      cssClasses: () => 'text-start',
      dataCssClasses: () => 'text-start',
      enableSort: true,
      hasFilter: true,
      visible: true,
      displayInFilterList: true,
      hasToolTip: false,
      showText: true,
      filter: {
        filterType: TableColumnFilterDataType.Text
      }
    },
    {
      translationKey: 'Balance',
      property: 'balance',
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
        filterType: TableColumnFilterDataType.Text
      }
    },
    {
      translationKey: 'Type',
      property: 'journalName',
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
        filterType: TableColumnFilterDataType.Text
      }
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
        filterType: TableColumnFilterDataType.Text
      }
    },
  ];

  pageSize = 5;

  tableSettings = new TableSettings({ enableActions: false, pageSize: this.pageSize, isLocalPaging: true });


  tableConfiguration: TableConfiguration<JournalModel> = {
    tableRowsActionsList: [],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };



  onStartSearch() {
    if (this.localAccount != null) {
      this.getJournalItemsByAccount(this.localAccount.accountId);
      this.getAccountOpenBalance(this.localAccount.accountId)
      this.getAccountCloseBalance(this.localAccount.accountId)
    }

  }
  selectAccount(accent: AccountModel) {
    this.localAccount = accent;
    this.getJournalItemsByAccount(accent.accountId);
    this.getAccountOpenBalance(accent.accountId)
    this.getAccountCloseBalance(this.localAccount.accountId)
  }

  async getJournalItemsByAccount(id: number) {
    const result = await this.generalAccountingService.getJournalItemsByAccount(id,
      this.pipe.transform(this.startDateFormControl.value, 'yyyy-MM-dd') ? this.pipe.transform(this.startDateFormControl.value, 'yyyy-MM-dd') : '2022-01-01',
      this.pipe.transform(this.endDateFormControl.value, 'yyyy-MM-dd') ? this.pipe.transform(this.endDateFormControl.value, 'yyyy-MM-dd') : '2022-12-31'
    );
    result.subscribe({
      error: (_error: any) => {
      },
      next: async (data: any) => {
        if (data.length === 0) {
          this.accountOpenBalance = 0;
          this.accountCloseBalance = 0;
        }
        this.journalList = data;
        this.tableConfiguration.data = data;
        this.tableConfiguration.dataCount = data.length;
        this.cdr.detectChanges();
        this.table.refresh();
      },
      complete: async () => {
      },
    });
  }

  async getAccountOpenBalance(id: number) {
    const result = await this.generalAccountingService.getAccountOpenBalance(id,
      this.pipe.transform(this.startDateFormControl.value.setDate(this.startDateFormControl.value.getDate() - 1), 'yyyy-MM-dd') ? this.pipe.transform(this.startDateFormControl.value, 'yyyy-MM-dd') : '2022-01-01',
    );
    result.subscribe({
      error: (_error: any) => {
      },
      next: async (data: any) => {
        this.accountOpenBalance = data;
      },
      complete: async () => {
      },
    });
  }
  async getAccountCloseBalance(id: number) {
    const result = await this.generalAccountingService.getAccountOpenBalance(id,
      this.pipe.transform(this.endDateFormControl.value, 'yyyy-MM-dd') ? this.pipe.transform(this.startDateFormControl.value, 'yyyy-MM-dd') : '2022-01-01',
    );
    result.subscribe({
      error: (_error: any) => {
      },
      next: async (data: any) => {
        this.accountCloseBalance = data;
      },
      complete: async () => {
      },
    });
  }
}
