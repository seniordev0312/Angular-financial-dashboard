import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableRowAction } from '@root/shared/models/table/table-row-action.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { EditCurrencyChangeComponent } from '../edit-currency-change/edit-currency-change.component';
import { GeneralAccountingService } from '../general-accounting/general-accounting.service';
import { CurrencyRateModel } from '../general-accounting/model/currency-rate.model';

@Component({
  selector: 'app-currency-editor',
  templateUrl: './currency-editor.component.html',
  styleUrls: ['./currency-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CurrencyEditorComponent implements OnInit {
  currenciesLastRates: CurrencyRateModel[] = [];
  currenciesRates: CurrencyRateModel[] = [];
  localCurrency: CurrencyRateModel;
  constructor(public dialog: MatDialog, private layoutService: LayoutService,
    private generalAccountingService: GeneralAccountingService,
    private cdr: ChangeDetectorRef,) { }

  startDateFormControl = new FormControl();
  endDateFormControl = new FormControl();
  pipe = new DatePipe('en-US');

  @ViewChild('tableCurrencyRates')
  tableCurrencyRates: WidgetTableComponent<CurrencyRateModel>;

  @ViewChild('tableCurrencyLastRates')
  tableCurrencyLastRates: WidgetTableComponent<CurrencyRateModel>;
  ngOnInit(): void {
    this.getCurrencyLastRates();
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.GeneralAccounting,
          translationKey: 'accounting-add-finance.general-accounting.general-accounting'
        },
        {
          route: ApplicationRoutes.CurrencyEditor,
          translationKey: 'Currency Editor'
        },
      ],
    });
  }

  onStartSearch() {
    this.getCurrencyRates();
  }

  async getCurrencyRates() {
    const result = await this.generalAccountingService.getCurrencyRates(
      this.localCurrency.currencyId,
      this.pipe.transform(this.startDateFormControl.value, 'yyyy-MM-dd') ? this.pipe.transform(this.startDateFormControl.value, 'yyyy-MM-dd') : '2022-01-01',
      this.pipe.transform(this.endDateFormControl.value, 'yyyy-MM-dd') ? this.pipe.transform(this.endDateFormControl.value, 'yyyy-MM-dd') : '2022-12-31'
    );
    result.subscribe({
      error: (_error: any) => {
      },
      next: async (data: any) => {
        this.currenciesRates = data;
        console.log(data)
        this.tableConfiguration.data = data;
        this.tableConfiguration.dataCount = data.length;
        this.cdr.detectChanges();
        this.tableCurrencyRates.refresh();
      },
      complete: async () => {
      },
    });
  }

  async getCurrencyLastRates() {
    const result = await this.generalAccountingService.getCurrencyLastRates(
    );
    result.subscribe({
      error: (_error: any) => {
      },
      next: async (data: any) => {
        this.currenciesLastRates = data;
        this.tableConfigurationLastChange.data = data;
        this.tableConfigurationLastChange.dataCount = data.length;
        this.cdr.detectChanges();
        this.tableCurrencyLastRates.refresh();
      },
      complete: async () => {
      },
    });
  }

  tableColumns: TableColumn[] = [
    {
      translationKey: 'Date',
      property: 'changeDate',
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
      translationKey: 'Currency',
      property: 'currencyName',
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
      translationKey: 'Amount LBP',
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
        filterType: TableColumnFilterDataType.Text
      }
    },
    {
      translationKey: 'Exchange',
      property: 'exchangeRate',
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
  tableConfiguration: TableConfiguration<CurrencyRateModel> = {
    tableRowsActionsList: [],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };




  tableColumnsLastChange: TableColumn[] = [
    {
      translationKey: 'Currency',
      property: 'currencyName',
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
        filterType: TableColumnFilterDataType.Text
      }
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
        filterType: TableColumnFilterDataType.Text
      }
    },
    {
      translationKey: 'LBP',
      property: 'baseCurrencyName',
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
      translationKey: 'Exchange',
      property: 'exchangeRate',
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

  editAction: TableRowAction<CurrencyRateModel> = {
    action: (data) => {
      this.localCurrency = data;
      let dialogRef = this.dialog.open(EditCurrencyChangeComponent, {
        data: data,
      });

      dialogRef.afterClosed().subscribe(() => {
        this.getCurrencyRates();
      });
    },
    cssClasses: 'text-black',
    iconName: 'drive_file_rename_outline',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };
  showAction: TableRowAction<CurrencyRateModel> = {
    action: (data) => {
      this.localCurrency = data;
      this.getCurrencyRates();
    },
    cssClasses: 'text-black',
    iconName: 'sort',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };
  tableSettingsLastChange = new TableSettings({ actionsMode: 'inline', enableActions: true, pageSize: this.pageSize, isLocalPaging: true });
  tableConfigurationLastChange: TableConfiguration<CurrencyRateModel> = {
    tableRowsActionsList: [this.showAction, this.editAction,],
    columns: this.tableColumnsLastChange,
    data: [],
    dataCount: 0,
    settings: this.tableSettingsLastChange,
  };

}
