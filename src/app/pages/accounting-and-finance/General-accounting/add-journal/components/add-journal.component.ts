import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableRowAction } from '@root/shared/models/table/table-row-action.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { interval, isObservable } from 'rxjs';
import { GeneralAccountingService } from '../../general-accounting/general-accounting.service';
import { JournalFormGroup } from '../form-groups/journal-form-group.service';
import { Location } from '@angular/common';
import { EntriesFormGroup } from '../form-groups/entries-form-group.service';
import { JournalItemsModel } from '../../general-accounting/model/journal-items.model';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { JournalsEntryTypeModel } from '../../general-accounting/model/journals-entry-type.model';
import { CurrencyModel } from '../../general-accounting/model/currency.model';
import { AccountModel } from '../../accounts/model/accounts.model';
import { TaxModel } from '../../general-accounting/model/tax.model';
import { JournalEntryModel } from '../../general-accounting/model/journal-entry.model';
import { ActivatedRoute } from '@angular/router';
import { EntitiesControlComponent } from '@root/pages/entities/entities-control/components/entities-control/entities-control.component';
import { MatDialog } from '@angular/material/dialog';
import { JournalService } from '../services/jornal.service';
import { DocumentModel } from '../../general-accounting/model/document.model';

@Component({
  selector: 'app-add-journal',
  templateUrl: './add-journal.component.html',
  styleUrls: ['./add-journal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddJournalComponent implements OnInit, OnDestroy {

  journalEntryModel: JournalEntryModel;
  Id = 0;
  form: FormGroup;
  formEntries: FormGroup;
  selectedFile: File = null;
  journalItems: JournalItemsModel[] = [];
  addRows = false;
  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<JournalItemsModel>;

  totalDebits: number = 0;
  totalCredits: number = 0;
  localAccount: AccountModel;
  productEin: '';
  journalsEntryType: JournalsEntryTypeModel[] = [];
  taxes: TaxModel[] = [];
  currencies: CurrencyModel[] = []
  documentList: DocumentModel[] = []
  qrCodeValue = '';

  entryTypes = [
    {
      id: 0,
      name: 'General'
    },
    {
      id: 1,
      name: 'Invoice'
    },
    {
      id: 2,
      name: 'CreditNote'
    },
    {
      id: 3,
      name: 'Bill'
    },
    {
      id: 4,
      name: 'Refund'
    },
  ];
  refreshIntervalId: any;
  constructor(private router: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private journalFormGroup: JournalFormGroup,
    private entriesFormGroup: EntriesFormGroup,
    private layoutService: LayoutService,
    private generalAccountingService: GeneralAccountingService,
    private _location: Location,
    private dialog: MatDialog,
    private journalService: JournalService
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe(data => {
      if (data) {
        this.Id = data['id'];
        this.getGeneralJournalEntryById(data['id']);
        if (this.Id) {
          this.getGuidByJournalEntry(this.Id);
        } else {
          this.getGuidByJournalEntry(0);
        }
      }
    });
    this.getCurrencies();
    this.form = this.journalFormGroup.getFormGroup();
    this.formEntries = this.entriesFormGroup.getFormGroup();
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.GeneralAccounting,
          translationKey: 'accounting-add-finance.general-accounting.general-accounting'
        },
        {
          route: ApplicationRoutes.AddJournal,
          translationKey: 'Add Journal'
        },
      ],
    });

    this.journalService.journalEIN$.subscribe(data => {
      this.form.patchValue({ 'ein': data });
    })
  }
  ngOnDestroy() {
    clearInterval(this.refreshIntervalId);
  }
  /// 


  tableColumns: TableColumn[] = [
    {
      translationKey: 'Sequence',
      property: 'sequence',
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
      translationKey: 'Account',
      property: 'accountId',
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
      translationKey: 'Debit',
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
      translationKey: 'Credit.',
      property: 'credit',
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
      translationKey: 'EIN',
      property: 'productEin',
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
      translationKey: 'Description',
      property: 'description',
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

  tableSettings = new TableSettings({ enableActions: true, actionsMode: 'inline', pageSize: this.pageSize, isLocalPaging: true });

  deleteAction: TableRowAction<JournalItemsModel> = {
    action: (data) => {
      this.deleteItem(data)
    },
    cssClasses: 'text-red-500',
    iconName: 'delete',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };


  deleteItem(data: JournalItemsModel) {
    this.journalItems = this.journalItems.filter(item => item.sequence !== data.sequence);
    this.tableConfiguration.data = this.journalItems;
    this.cdr.detectChanges();
    this.table.refresh();
  }
  tableConfiguration: TableConfiguration<JournalItemsModel> = {
    tableRowsActionsList: [this.deleteAction],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  onAddEntries() {
    if (this.formEntries.valid && this.localAccount.name.length !== 0 && this.taxes.length !== 0) {
      this.journalItems.push({
        journalItemId: 0,
        sequence: this.journalItems.length + 1,
        accountId: this.localAccount.accountId,
        productEin: this.productEin,
        debit: this.formEntries.value.debit,
        credit: this.formEntries.value.credit,
        description: this.formEntries.value.description,
        taxes: this.taxes
      });
      this.countTotal();
      this.formEntries.reset();
      this.addRows = false;
      this.tableConfiguration.data = this.journalItems;
      this.cdr.detectChanges();
      this.table.refresh();
    }
  }


  countTotal() {
    this.totalCredits = 0;
    this.totalDebits = 0;
    for (var item of this.journalItems) {
      this.totalCredits = this.totalCredits + item.credit;
      this.totalDebits = this.totalDebits + item.debit;
    }
  }
  onShowEntriesForm() {
    this.addRows = true;
    this.cdr.detectChanges();
  }
  onAddJournal() {
    if (this.form.valid && this.journalItems.length !== 0)
      this.addJournalEntryWithDetails({
        journalEntryId: this.Id ? this.Id : 0,
        journalEntryType: this.form.value.entryType,
        journalId: this.form.value.journalId,
        entryName: '/',
        description: this.form.value.description,
        state: 1,
        currencyId: this.form.value.currencyId,
        entryDate: this.form.value.entryDate,
        postDate: this.form.value.postDate,
        dueDate: this.form.value.dueDate,
        source: 'source',
        contactEin: this.form.value.ein,
        bookId: 0,
        journalItems: this.journalItems
      });
  }

  async addJournalEntryWithDetails(item: JournalEntryModel) {
    const result = await this.generalAccountingService.addJournalEntryWithDetails(item);
    if (isObservable(result)) {
      result.subscribe({
        error: (_error: any) => {
        },
        next: async (data: any) => {
          this.onCancel();
          console.log(data)
        },
        complete: async () => {
        },
      });
    }
  }

  async getJournalsByEntryType(entryTypeID: any) {
    const result = await this.generalAccountingService.getJournalsByEntryType(entryTypeID);
    if (isObservable(result)) {
      result.subscribe({
        error: (_error: any) => {
        },
        next: async (data: any) => {
          if (data)
            this.journalsEntryType = data;
          this.cdr.detectChanges();
        },
        complete: async () => {
        },
      });
    }
  }

  async getCurrencies() {
    const result = await this.generalAccountingService.getCurrencies();
    if (isObservable(result)) {
      result.subscribe({
        error: (_error: any) => {
        },
        next: async (data: any) => {
          if (data)
            this.currencies = data;
        },
        complete: async () => {
        },
      });
    }
  }

  onEinChange(event: any) {
    if (event.target.value.length !== 0) {
      this.productEin = event.target.value;
      this.getProductTaxByProductEin(event.target.value)
    }

  }

  async getProductTaxByProductEin(ein: number) {
    const result = await this.generalAccountingService.getProductTaxByProductEin(ein);
    if (isObservable(result)) {
      result.subscribe({
        error: (_error: any) => {
        },
        next: async (data: any) => {
          if (data)
            this.taxes = data;
          this.cdr.detectChanges();
        },
        complete: async () => {
        },
      });
    }
  }

  async getGeneralJournalEntryById(id: number) {
    if (id) {
      const result = await this.generalAccountingService.getGeneralJournalEntryById(id);
      if (isObservable(result)) {
        result.subscribe({
          error: (_error: any) => {
          },
          next: async (data: any) => {
            this.journalEntryModel = data;
            this.journalItems = data.journalItems;
            this.form.value.ein = data.contactEin;
            this.tableConfiguration.data = this.journalItems;
            this.getJournalsByEntryType(this.journalEntryModel.journalEntryType)
            this.countTotal();
            this.cdr.detectChanges();
            this.table.refresh();

          },
          complete: async () => {
          },
        });
      }
    }

  }

  selectAccount(accent: AccountModel) {
    this.localAccount = accent;
  }
  onCancel() {
    this._location.back();
  }
  
    onEinFocus() {
    if (this.form.get('ein').value === '') {
      this.dialog.open(EntitiesControlComponent, {
        width: '90%',
        height: '90%',
        data: true
      })
    }
  }



  async getGuidByJournalEntry(id: number) {
    const result = await this.generalAccountingService.getGuidByJournalEntry(id);
    if (isObservable(result)) {
      result.subscribe({
        error: (_error: any) => {
        },
        next: async (data: any) => {
          this.qrCodeValue = 'https://dev.camera.aperatureuk.com' + '?guid=' + data;
          if (!this.Id || this.Id === 0) {
            this.getJournalEntryByGuid(data);
          }
          this.cdr.detectChanges();
        },
        complete: async () => {
        },
      });
    }
  }

  async getDocumentList(id: number) {
    const result = await this.generalAccountingService.getDocumentList(id);
    if (isObservable(result)) {
      result.subscribe({
        error: (_error: any) => {
        },
        next: async (data: any) => {
          if (data.layout != 0 && data.length != this.documentList) {
            this.documentList = data;
            this.getGuidByJournalEntry(this.Id);
            this.cdr.detectChanges();

          }
        },
        complete: async () => {
        },
      });
    }
  }

  async onDownloadFile(docId: number) {
    const result = await this.generalAccountingService.downloadFile(this.Id, docId);
    if (isObservable(result)) {
      result.subscribe({
        error: (_error: any) => {
        },
        next: async (data: any) => {
          console.log(data);

        },
        complete: async () => {
        },
      });
    }
  }


  async getJournalEntryByGuid(guid: any) {
    const result = await this.generalAccountingService.getJournalEntryByGuid(guid);
    if (isObservable(result)) {
      result.subscribe({
        error: (_error: any) => {
        },
        next: async (data: any) => {
          console.log("DDD", data['journalEntryId'])
          this.Id = data['journalEntryId'];
          this.refreshIntervalId = interval(50000).subscribe(x => { console.log(x), this.getDocumentList(this.Id); })
          this.cdr.detectChanges();
        },
        complete: async () => {
        },
      });
    }
  }

}
