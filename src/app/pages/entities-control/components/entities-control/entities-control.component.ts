import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
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
import { EntitiesControlListItem } from '../../models/entities-control-list-item.model';
import { AddEntityComponent } from '../add-entity/add-entity.component';


@Component({
  selector: 'app-entities-control',
  templateUrl: './entities-control.component.html',
  styleUrls: ['./entities-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesControlComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<EntitiesControlListItem>;
  pageSize = 10;
  pageIndex = 1;
  filter: Filter[];
  entityTypesList: BaseListItem[] = [
    { id: '1', name: 'type1' },
    { id: '1', name: 'type2' }
  ];
  entitiesList: EntitiesControlListItem[] = [
    {
      einNumber: 'opoj',
      name: '222',
      location: 'Lebanon',
      sourceType: 'oooooo',
      type: ',mmmmmm'
    },
    {
      einNumber: 'opoj',
      name: '222',
      location: 'Lebanon',
      sourceType: 'oooooo',
      type: ',mmmmmm'
    }, {
      einNumber: 'opoj',
      name: '222',
      location: 'Lebanon',
      sourceType: 'oooooo',
      type: ',mmmmmm'
    }, {
      einNumber: 'opoj',
      name: '222',
      location: 'Lebanon',
      sourceType: 'oooooo',
      type: ',mmmmmm'
    }, {
      einNumber: 'opoj',
      name: '222',
      location: 'Lebanon',
      sourceType: 'oooooo',
      type: ',mmmmmm'
    }, {
      einNumber: 'opoj',
      name: '222',
      location: 'Lebanon',
      sourceType: 'oooooo',
      type: ',mmmmmm'
    }, {
      einNumber: 'opoj',
      name: '222',
      location: 'Lebanon',
      sourceType: 'oooooo',
      type: ',mmmmmm'
    }, {
      einNumber: 'opoj',
      name: '222',
      location: 'Lebanon',
      sourceType: 'oooooo',
      type: ',mmmmmm'
    }, {
      einNumber: 'opoj',
      name: '222',
      location: 'Lebanon',
      sourceType: 'oooooo',
      type: ',mmmmmm'
    }, {
      einNumber: 'opoj',
      name: '222',
      location: 'Lebanon',
      sourceType: 'oooooo',
      type: ',mmmmmm'
    }, {
      einNumber: 'opoj',
      name: '222',
      location: 'Lebanon',
      sourceType: 'oooooo',
      type: ',mmmmmm'
    }, {
      einNumber: 'opoj',
      name: '222',
      location: 'Lebanon',
      sourceType: 'oooooo',
      type: ',mmmmmm'
    },
  ]
  tableColumns: TableColumn[] = [
    {
      translationKey: 'EIN Number',
      property: 'einNumber',
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
      property: 'location',
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
      property: 'sourceType',
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

  editAction: TableRowAction<EntitiesControlListItem> = {
    action: (data) => this.onEntityEdited(data),
    cssClasses: 'text-primary',
    iconName: 'edit',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  viewAction: TableRowAction<EntitiesControlListItem> = {
    action: (data) => this.onEntityViewed(data),
    cssClasses: 'text-primary',
    iconName: 'visibility',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  tableSettings = new TableSettings({ actionsMode: 'inline', pageSize: this.pageSize });

  tableConfiguration: TableConfiguration<EntitiesControlListItem> = {
    tableRowsActionsList: [this.editAction, this.viewAction],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };

  constructor(private dialog: MatDialog) { super(); }


  ngOnInit(): void {
    this.tableConfiguration.data = this.entitiesList;
    this.tableConfiguration.dataCount = this.entitiesList.length;
  }

  ngAfterViewInit(): void {
    this.table.refresh();
  }




  onEntityEdited(_category: EntitiesControlListItem) {
    this.dialog.open(AddEntityComponent, {
      width: '100%',
      height: '100%'
    });
  }

  onEntityViewed(_category: EntitiesControlListItem) {
  }

}
