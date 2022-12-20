import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';

import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableRowAction } from '@root/shared/models/table/table-row-action.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { PrintJournalComponent } from '../../print-journal/print-journal.component';
import { GeneralAccountingService } from '../general-accounting.service';
import { JournalList$, JournalTotal$ } from '../general-accounting.store';
import { JournalTotalsModel } from '../model/journal-totals.model';
import { JournalModel } from '../model/journal.model';


@Component({
  selector: 'app-general-accounting',
  templateUrl: './general-accounting.component.html',
  styleUrls: ['./general-accounting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralAccountingComponent extends BaseComponent implements OnInit {
  journalList: JournalModel[] = [];
  journalTotal: JournalTotalsModel;
  startDateFormControl = new FormControl();
  endDateFormControl = new FormControl();
  pipe = new DatePipe('en-US');

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<JournalModel>;
  constructor(private router:
    Router, private layoutService: LayoutService,
    private generalAccountingService: GeneralAccountingService, private cdr: ChangeDetectorRef, public dialog: MatDialog) { super(); }

  ///
  ngOnInit(): void {
    this.generalAccountingService.getJournalItems('2022-01-01', '2022-12-31');
    this.generalAccountingService.getJournalItemTotals('2022-01-01', '2022-12-31');
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.GeneralAccounting,
          translationKey: 'accounting-add-finance.general-accounting.general-accounting'
        }
      ],
    });

    this.subscriptions.add(JournalList$.subscribe(data => {
      this.journalList = data;
      this.tableConfiguration.data = data;
      this.tableConfiguration.dataCount = data.length;
      this.cdr.detectChanges();
      this.table.refresh();
    }));

    this.subscriptions.add(JournalTotal$.subscribe(data => {
      this.journalTotal = data;
      this.cdr.detectChanges();
    }));
    this.journalTotal = { totalDebit: 0, totalCredit: 0, totalBalance: 0 }
  }


  /// 




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

  tableSettings = new TableSettings({ actionsMode: 'inline', pageSize: this.pageSize, isLocalPaging: true });

  editAction: TableRowAction<JournalModel> = {
    action: (data) => {
      this.router.navigate([`${ApplicationRoutes.GeneralAccounting}/${ApplicationRoutes.AddJournal}`,
      { id: data.journalEntryId }], { skipLocationChange: true })
    },
    cssClasses: 'text-black',
    iconName: 'drive_file_rename_outline',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  copyAction: TableRowAction<JournalModel> = {
    action: (data) => { console.log(data) },
    cssClasses: 'text-black',
    iconName: 'content_copy',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  printAction: TableRowAction<JournalModel> = {
    action: (data) => {
      console.log(data)
      this.dialog.open(PrintJournalComponent, {
        width: '70%',
      });
    },
    cssClasses: 'text-black',
    iconName: 'print',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  tableConfiguration: TableConfiguration<JournalModel> = {
    tableRowsActionsList: [this.editAction, this.printAction],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };


  onStartSearch() {
    this.pipe.transform(this.startDateFormControl.value, 'yyyy/MM/dd');
    this.generalAccountingService.getJournalItems(this.pipe.transform(this.startDateFormControl.value, 'yyyy-MM-dd'), this.pipe.transform(this.endDateFormControl.value, 'yyyy-MM-dd'));
    this.generalAccountingService.getJournalItemTotals(this.pipe.transform(this.startDateFormControl.value, 'yyyy-MM-dd'), this.pipe.transform(this.endDateFormControl.value, 'yyyy-MM-dd'));
  }
  //
  currencyEditorClick() {
    this.router.navigate([`${ApplicationRoutes.GeneralAccounting}/${ApplicationRoutes.CurrencyEditor}`])
  }

  accountsClick() {
    this.router.navigate([`${ApplicationRoutes.GeneralAccounting}/${ApplicationRoutes.Accounts}`])
  }

  addJournalEntryClick() {
    this.router.navigate([`${ApplicationRoutes.GeneralAccounting}/${ApplicationRoutes.AddJournal}`])
  }

}
