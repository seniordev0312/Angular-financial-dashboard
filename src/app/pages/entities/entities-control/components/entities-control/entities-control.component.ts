import { DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Inject, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JournalService } from '@root/pages/accounting-and-finance/General-accounting/add-journal/services/jornal.service';
import { GeneralAccountingRepository } from '@root/pages/accounting-and-finance/General-accounting/general-accounting/general-accounting.repository';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { Filter } from '@root/shared/models/table/filter.model';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableRowAction } from '@root/shared/models/table/table-row-action.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { DataTypeControlService } from '@root/shared/services/data-type-control.service';
import { LayoutService } from '@root/shared/services/layout.service';
import { isSpinning$ } from '@root/shared/store/shared.store';
import { Observable } from 'rxjs';
import { DynamicFilter } from '../../models/dynamic-filter.model';
import { EntitiesTableItem } from '../../models/entities-table-item.model';
import { EntityEntriesListItem } from '../../models/entity-entries-list-item.model';
import { EntityType } from '../../models/entity-type.model';
import { FilterFieldsModel } from '../../models/filter-fields-model';
import { EntitiesControlService } from '../../services/entity-control.service';
import { EntitiesControlRepository } from '../../store/entities-control.repository';
import { dynamicFiltersList$, entitiesList$, entityTypes$ } from '../../store/entities-control.store';
import { AddEntityComponent } from '../add-entity/add-entity.component';
import { ChangeFiltersDialogComponent } from '../change-filters-dialog/change-filters-dialog.components';

@Component({
  selector: 'app-entities-control',
  templateUrl: './entities-control.component.html',
  styleUrls: ['./entities-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesControlComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<any>;
  pageSize = 10000;
  pageIndex = 1;
  entityEntriesList: any[];
  filter: Filter[];
  entityTypesOptionsList: BaseListItem[] = [];
  entityTypesList: EntityType[] = [];
  filterFields: FilterFieldsModel[] = [];
  entityTypeFormControl = new FormControl('Entity');
  entitiesList: any[] = [];
  isSpinning$: Observable<boolean>;
  einFocus = -1;
  onFirstActive = true;
  entityName = 'Entity';
  pipe = new DatePipe('en-US');
  tableColumns: TableColumn[] = [
    {
      translationKey: 'EIN',
      property: 'EIN',
      type: 'text',
      svgIcon: '',
      cssClasses: () => '',
      dataCssClasses: () => 'underline text-center text-accent',
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
      translationKey: 'Name',
      property: 'Name',
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
      property: 'type',
      type: 'text',
      cssClasses: () => '',
      dataCssClasses: () => '',
      enableSort: false,
      hasFilter: true,
      visible: true,
      displayInFilterList: true,
      hasToolTip: false,
      showText: true,
      filter: {
        filterType: TableColumnFilterDataType.Text,
      }
    },
    {
      translationKey: 'Location',
      property: 'Location',
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
      translationKey: 'Source Type',
      property: 'Source',
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

  editAction: TableRowAction<any> = {
    action: (data) => this.onEntityEdited(data),
    cssClasses: 'text-primary',
    iconName: 'border_color',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  viewAction: TableRowAction<any> = {
    action: (data) => this.onEntityViewed(data),
    cssClasses: 'text-primary',
    iconName: 'visibility',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  selectAction: TableRowAction<EntitiesTableItem> = {
    action: (data) => {
      this.generalAccountingRepository.updateEinValue(data.EIN);
      this.dialog.closeAll();
    },
    cssClasses: 'text-primary',
    iconName: 'check_circle_outline',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };





  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public showSelection: boolean,
    private entitiesControlRepository: EntitiesControlRepository,
    private journalService: JournalService,
    private layoutService: LayoutService,
    private generalAccountingRepository: GeneralAccountingRepository,
    private cdr: ChangeDetectorRef,
    private dataTypeControlService: DataTypeControlService,
    private entitiesControlService: EntitiesControlService) { super(); }


  ngOnInit(): void {

    this.layoutService.onHandleEinFocus().subscribe((data: any) => {
      this.einFocus = data ? data : -1;
    });

    if (this.showSelection) {
      this.tableConfiguration.settings = new TableSettings({
        actionsMode: 'inline',
        pageSize: this.pageSize,
        isLocalPaging: true,
        isRowsSelectionAvailable: true,
        dataKey: 'EIN'
      });
      this.table?.refresh();
    }

    //this.entitiesControlService.getEntitiesList(this.pageIndex, this.pageSize, this.entityTypeFormControl.value);
    this.entitiesControlService.getEntityTypesList();
    this.isSpinning$ = isSpinning$;
    const fg: any = {};
    this.filterFields.forEach(field => {
      fg[field.elementName] = new FormControl(null);
    });
    this.filterFG = new FormGroup(fg);
    this.subscriptions.add(entitiesList$.subscribe(data => {
      if (!this.isEmpty(data)) {
        const items: any[] = [];
        data.entityRecordItems.forEach(e => {
          let item = {};
          e.sections.forEach(section => {
            item = { ...item, ...section.properties };
          });
          items.push(item);
        });
        this.entityEntriesList = items;
        this.tableConfiguration.data = items;
        this.tableConfiguration.dataCount = data.totalPages;
        this.table?.refresh();
      }
    }));


    this.subscriptions.add(entityTypes$.subscribe(data => {
      if (!this.isEmpty(data)) {
        if (this.einFocus !== -1) {
          this.onFirstActive = false;
          this.entityTypesList = data;
          this.entityTypesList = this.einFocus === 1 ? data.filter(x => x.name == 'Person') : data.filter(x => x.name == 'Policy');
          this.entityTypesOptionsList = this.einFocus === 1 ? data.filter(x => x.name == 'Person').map(e => ({ id: e.code, value: e.name })) : data.filter(x => x.name == 'Policy').map(e => ({ id: e.code, value: e.name }));
          this.entityTypeFormControl = new FormControl(this.entityTypesOptionsList[0].id.toString());
          this.entitiesControlService.getEntitiesList(this.pageIndex, this.pageSize, this.entityTypeFormControl.value);
          this.tableConfiguration.tableRowsActionsList = [this.editAction, this.viewAction, this.selectAction];
          this.table.refresh();
          this.cdr.detectChanges();
        } else {
          this.entityTypesList = data;
          this.entityTypesOptionsList = [{ id: '100', value: 'All' }, ...data.map(e => ({ id: e.code, value: e.name }))];
          // if (this.onFirstActive == false) {
          //   this.entitiesControlService.getEntitiesList(this.pageIndex, this.pageSize, this.entityTypeFormControl.value);
          // }
          // this.tableConfiguration.tableRowsActionsList = [this.editAction, this.viewAction,];
          // this.table.refresh();
          // this.cdr.detectChanges();
        }
      }

    }));

    this.subscriptions.add(this.entityTypeFormControl.valueChanges.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.entityName = this.entityTypesList.filter(x => x.code == data)[0].name;
        this.entitiesControlService.getEntitiesList(this.pageIndex, this.pageSize, data);
        const entityDefinitionId = this.entityTypesList.find(entity => entity.code === data).entityDefinitionId;
        this.entitiesControlService.getEntityDynamicFiltersList(entityDefinitionId);
      }
    }));

    this.subscriptions.add(dynamicFiltersList$.subscribe(data => {
      this.filterFG = this.getFormGroup([]);
      if (!this.isEmpty(data)) {
        this.filterFields = [];
        this.filterFG = this.getFormGroup(data);
        this.tableConfiguration.columns = [];
        const einClass = 'underline text-center text-accent';
        if (data.length > 8) {
          for (let index = 0; index < data.length; index++) {
            this.filterFields.push({
              elementName: data[index].elementName,
              elementType: data[index].elementType,
              isActive: index + 1 <= 8,
            });
            this.tableConfiguration.columns.push({
              translationKey: data[index].elementName,
              property: data[index].elementName,
              type: 'text',
              svgIcon: '',
              cssClasses: () => '',
              dataCssClasses: () => data[index].elementName === 'EIN' ? einClass : 'text-center',
              enableSort: true,
              hasFilter: true,
              visible: true,
              displayInFilterList: false,
              hasToolTip: false,
              showText: true,
              filter: {
                filterType: TableColumnFilterDataType.Text
              }
            })
          }
        } else {
          data.forEach(item => {
            this.filterFields.push({
              elementName: item.elementName,
              elementType: item.elementType,
              isActive: true,
            });
            this.tableConfiguration.columns.push({
              translationKey: item.elementName,
              property: item.elementName,
              type: 'text',
              svgIcon: '',
              cssClasses: () => '',
              dataCssClasses: () => item.elementName === 'EIN' ? einClass : 'text-center',
              enableSort: true,
              hasFilter: true,
              visible: true,
              displayInFilterList: false,
              hasToolTip: false,
              showText: true,
              filter: {
                filterType: TableColumnFilterDataType.Text
              }
            })
          });
        }

        this.table.refresh();
      }
    }));
  }


  ngOnDestroy(): void {
    this.entitiesControlRepository.updateEntitiesTypesList([]);
    this.entitiesControlRepository.updateEntityDynamicFiltersList([]);
    this.layoutService.changeEinFocus(-1);
  }
  tableSettings = new TableSettings({
    actionsMode: 'inline', pageSize: this.pageSize, isLocalPaging: true, dynamicActions: false, dataKey: 'EIN'
  });
  filterFG: FormGroup;
  tableConfiguration: TableConfiguration<any> = {
    tableRowsActionsList: [],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };



  getFormGroup(data: DynamicFilter[]) {
    const fg: any = {};
    data.forEach(field => {
      fg[field.elementName] = new FormControl(null);
    });
    return new FormGroup(fg);
  }

  onEntityAdded() {
    this.entitiesControlRepository.updateSelectedEntityEntry({} as EntityEntriesListItem);
    this.dialog.open(AddEntityComponent, {
      width: '90%',
      height: '90%'
    });
  }


  onEntityEdited(data: any) {
    this.entitiesControlRepository.updateSelectedEntityEntry({} as EntityEntriesListItem);
    this.dialog.open(AddEntityComponent, {
      width: '90%',
      height: '90%',
      data: { ein: data.EIN, mode: 'edit' }
    });
  }

  onEntityViewed(data: any) {
    this.entitiesControlRepository.updateSelectedEntityEntry({} as EntityEntriesListItem);
    this.dialog.open(AddEntityComponent, {
      width: '90%',
      height: '90%',
      data: { ein: data.EIN, mode: 'view' }
    });
  }

  getFormControl(key: string): FormControl {
    return this.filterFG.controls[key] as FormControl;
  }

  onPaging(data: any): void {
    if (data.isNextPage) {
      this.pageIndex = this.pageIndex + 1;
    }
    else {
      this.pageIndex = this.pageIndex - 1;
    }
    this.entitiesControlService.getEntitiesList(this.pageIndex, this.pageSize, this.entityTypeFormControl.value);
  }

  onFilterChange(value: any, field: string) {
    this.table.dataTable.filters[field] = { value: value, matchMode: "contains", operator: "and" };
    this.table.dataTable.filter(value, field, "contains");
  }

  onTableFilter(value: any[]) {
    const data: any = {};
    value.forEach((e: any) => {
      if (this.checkIfTypeIsName(e['name'])) {
        data[e['name']] = this.pipe.transform(e['value'], 'dd/MM/yyyy')
      } else {
        data[e['name']] = e['value'];
      }

    });

    this.filterFG.patchValue(data, { emitEvent: false })
  }

  onRowsSelected(data: any) {
    this.journalService.updateJournalEIN(data[0].EIN);
    this.dialog.closeAll();
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '35%';
    dialogConfig.height = '28%';
    dialogConfig.data = {
      filterFields: this.filterFields
    }
    const CurrentDialog = this.dialog.open(ChangeFiltersDialogComponent, dialogConfig);
    CurrentDialog.beforeClosed().subscribe(
      data => {
        if (!this.isEmpty(data) && data.newFilterFields.length !== 0) {
          const einClass = 'underline text-center text-accent';
          this.filterFields = [];
          let filterFieldsTempActive = [];
          let filterFieldsTempDisActive = [];
          this.tableConfiguration.columns = [];
          this.filterFields = data.newFilterFields;
          for (let index = 0; index < this.filterFields.length; index++) {
            if (this.filterFields[index].isActive) {
              this.tableConfiguration.columns.push({
                translationKey: this.filterFields[index].elementName,
                property: this.filterFields[index].elementName,
                type: 'text',
                svgIcon: '',
                cssClasses: () => '',
                dataCssClasses: () => this.filterFields[index].elementName === 'EIN' ? einClass : 'text-center',
                enableSort: true,
                hasFilter: true,
                visible: true,
                displayInFilterList: false,
                hasToolTip: false,
                showText: true,
                filter: {
                  filterType: TableColumnFilterDataType.Text
                }
              })
            }
            if (!this.filterFields[index].isActive) {
              filterFieldsTempDisActive.push(this.filterFields[index])
            } else {
              filterFieldsTempActive.push(this.filterFields[index])
            }
          }
          this.filterFields = [...filterFieldsTempActive, ...filterFieldsTempDisActive];
          this.table.refresh();
          this.cdr.detectChanges();
        }
      }
    );
  }

  getDataType(elementType: number) {
    return this.dataTypeControlService.getDataType(elementType);
  }

  checkIfTypeIsName(name: string) {
    let result = this.filterFields.filter((item) => item.elementName == name);
    if (result.length !== 0) {
      return this.getDataType(result[0].elementType) === 'date';
    } else {
      return false;
    }

  }
}


