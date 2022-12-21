import { Component, OnInit, ChangeDetectionStrategy, ViewChild, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JournalService } from '@root/pages/accounting-and-finance/General-accounting/add-journal/services/jornal.service';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { Filter } from '@root/shared/models/table/filter.model';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableRowAction } from '@root/shared/models/table/table-row-action.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { isSpinning$ } from '@root/shared/store/shared.store';
import { Observable } from 'rxjs';
import { DynamicFilter } from '../../models/dynamic-filter.model';
import { EntityEntriesListItem } from '../../models/entity-entries-list-item.model';
import { EntityType } from '../../models/entity-type.model';
import { EntitiesControlService } from '../../services/entity-control.service';
import { EntitiesControlRepository } from '../../store/entities-control.repository';
import { dynamicFiltersList$, entitiesList$, entityTypes$ } from '../../store/entities-control.store';
import { AddEntityComponent } from '../add-entity/add-entity.component';

@Component({
  selector: 'app-entities-control',
  templateUrl: './entities-control.component.html',
  styleUrls: ['./entities-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesControlComponent extends BaseComponent implements OnInit {
  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<any>;
  pageSize = 10000;
  pageIndex = 1;
  entityEntriesList: any[];
  filter: Filter[];
  entityTypesOptionsList: BaseListItem[] = [];
  entityTypesList: EntityType[] = [];
  filterFields: string[] = ['EIN', 'Name', 'Source', 'Location', 'Icon'];
  entityTypeFormControl = new FormControl('100');
  entitiesList: any[] = [];
  isSpinning$: Observable<boolean>;

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

  tableSettings = new TableSettings({
    actionsMode: 'inline', pageSize: this.pageSize, isLocalPaging: true, dataKey: 'EIN'
  });
  filterFG: FormGroup;
  tableConfiguration: TableConfiguration<any> = {
    tableRowsActionsList: [this.editAction, this.viewAction],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };

  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public showSelection: boolean,
    private entitiesControlRepository: EntitiesControlRepository,
    private journalService: JournalService,
    private entitiesControlService: EntitiesControlService) { super(); }


  ngOnInit(): void {

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

    this.entitiesControlService.getEntitiesList(this.pageIndex, this.pageSize, this.entityTypeFormControl.value);
    this.entitiesControlService.getEntityTypesList();
    this.isSpinning$ = isSpinning$;
    const fg: any = {};
    this.filterFields.forEach(field => {
      fg[field] = new FormControl(null);
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
        this.entityTypesList = data;
        this.entityTypesOptionsList = [{ id: '100', value: 'All' }, ...data.map(e => ({ id: e.code, value: e.name }))];
      }
    }));

    this.subscriptions.add(this.entityTypeFormControl.valueChanges.subscribe(data => {
      this.entitiesControlService.getEntitiesList(this.pageIndex, this.pageSize, data);
      const entityDefinitionId = this.entityTypesList.find(entity => entity.code === data).entityDefinitionId;
      this.entitiesControlService.getEntityDynamicFiltersList(entityDefinitionId);
    }));

    this.subscriptions.add(dynamicFiltersList$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.filterFields = [];
        this.filterFG = this.getFormGroup(data);
        this.tableConfiguration.columns = [];
        const einClass = 'underline text-center text-accent';
        data.forEach(item => {
          this.filterFields.push(item.elementName);
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
        this.table.refresh();
      }
    }));
  }

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
      data[e['name']] = e['value'];
    });
    this.filterFG.patchValue(data, { emitEvent: false })
  }

  onRowsSelected(data: any) {
    this.journalService.updateJournalEIN(data[0].EIN);
    this.dialog.closeAll();
  }
}
