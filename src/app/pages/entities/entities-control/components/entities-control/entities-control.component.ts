import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { Filter } from '@root/shared/models/table/filter.model';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableRowAction } from '@root/shared/models/table/table-row-action.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { EntityFilterFormGroup } from '../../form-group/entity-filter-form-group.service';
import { EntitiesTableItem } from '../../models/entities-table-item.model';
import { EntityEntriesList } from '../../models/entity-entries-list.model';
import { EntitiesControlService } from '../../services/entity-control.service';
import { entitiesList$, entityTypes$ } from '../../store/entities-control.store';
import { AddEntityComponent } from '../add-entity/add-entity.component';

@Component({
  selector: 'app-entities-control',
  templateUrl: './entities-control.component.html',
  styleUrls: ['./entities-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesControlComponent extends BaseComponent implements OnInit {
  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<EntitiesTableItem>;
  pageSize = 10;
  pageIndex = 1;
  entityEntriesList: EntityEntriesList;
  filter: Filter[];
  entityTypesList: BaseListItem[] = [];
  entityTypeFormControl = new FormControl('100');
  entitiesList: EntitiesTableItem[] = [];
  tableColumns: TableColumn[] = [
    {
      translationKey: 'EIN',
      property: 'EIN',
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
        filterType: TableColumnFilterDataType.DropDown,
        selectListViewProperty: 'name',
        selectOptionsList: this.entityTypesList
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

  editAction: TableRowAction<EntitiesTableItem> = {
    action: (data) => this.onEntityEdited(data),
    cssClasses: 'text-primary',
    iconName: 'border_color',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  viewAction: TableRowAction<EntitiesTableItem> = {
    action: (data) => this.onEntityViewed(data),
    cssClasses: 'text-primary',
    iconName: 'visibility',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  tableSettings = new TableSettings({ actionsMode: 'inline', pageSize: this.pageSize, isLocalPaging: false });
  filterFG: FormGroup;
  tableConfiguration: TableConfiguration<EntitiesTableItem> = {
    tableRowsActionsList: [this.editAction, this.viewAction],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };

  constructor(private dialog: MatDialog,
    private entitiesControlService: EntitiesControlService,
    private entityFilterFormGroup: EntityFilterFormGroup) { super(); }


  ngOnInit(): void {
    this.entitiesControlService.getEntitiesList(this.pageIndex, this.pageSize, this.entityTypeFormControl.value);
    this.entitiesControlService.getEntityTypesList();

    this.filterFG = this.entityFilterFormGroup.getFormGroup();

    this.subscriptions.add(entitiesList$.subscribe(data => {
      if (!this.isEmpty(data)) {
        const items: EntitiesTableItem[] = [];
        data.entityRecordItems.forEach(e => {
          e.sections.forEach(section => {
            if (section.name === 'Common') {
              items.push({
                Location: section.properties['Location'],
                EIN: section.properties['EIN'],
                Name: section.properties['Name'],
                Source: section.properties['Source'],
                type: e.entityCode
              });
            }
          });
        });
        this.entityEntriesList = data;
        this.tableConfiguration.data = items;
        this.tableConfiguration.dataCount = data.totalPages;
        this.table?.refresh();
      }
    }));

    this.subscriptions.add(entityTypes$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.entityTypesList = [{ id: '100', value: 'All' }, ...data];
      }
    }));

    this.subscriptions.add(this.entityTypeFormControl.valueChanges.subscribe(data => {
      this.entitiesControlService.getEntitiesList(this.pageIndex, this.pageSize, data);
    }));
  }


  onEntityAdded() {
    this.dialog.open(AddEntityComponent, {
      width: '90%',
      height: '90%'
    });
  }


  onEntityEdited(_category: EntitiesTableItem) {
    this.dialog.open(AddEntityComponent, {
      width: '90%',
      height: '90%'
    });
  }

  onEntityViewed(_category: EntitiesTableItem) {
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
}
