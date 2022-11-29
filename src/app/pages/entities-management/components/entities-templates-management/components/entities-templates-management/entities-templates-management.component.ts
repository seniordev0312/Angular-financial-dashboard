import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { Filter } from '@root/shared/models/table/filter.model';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableRowAction } from '@root/shared/models/table/table-row-action.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { EntityTemplatesListItem } from '../../models/entity-templates-list-item.model';

@Component({
  selector: 'app-entities-templates-management',
  templateUrl: './entities-templates-management.component.html',
  styleUrls: ['./entities-templates-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesTemplatesManagementComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<EntityTemplatesListItem>;
  pageSize = 50;
  pageIndex = 1;
  filter: Filter[];
  templatesList: EntityTemplatesListItem[] = [
    {
      id: 1,
      name: '222',
      isActive: false,
      description: 'oooooo'
    },
    {
      id: 1,
      name: '222',
      isActive: true,
      description: 'oooooo'
    },
    {
      id: 1,
      name: '222',
      isActive: true,
      description: 'oooooo'
    },
    {
      id: 1,
      name: '222',
      isActive: true,
      description: 'oooooo'
    }
  ]
  tableColumns: TableColumn[] = [
    {
      translationKey: 'ID',
      property: 'id',
      type: 'text',
      svgIcon: '',
      cssClasses: () => '',
      dataCssClasses: () => '',
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
      dataCssClasses: () => (window.innerWidth > 740 ? '' : 'text-center'),
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
      dataCssClasses: () => (window.innerWidth > 740 ? '' : 'text-center'),
      enableSort: false,
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
      translationKey: '',
      property: 'isActive',
      type: 'bool',
      cssClasses: () => '',
      dataCssClasses: () => (window.innerWidth > 740 ? '' : 'text-center'),
      enableSort: false,
      hasFilter: false,
      visible: true,
      displayInFilterList: true,
      hasToolTip: false,
      showText: true,
      action: () => { }
    },
  ];

  editAction: TableRowAction<EntityTemplatesListItem> = {
    action: (data) => this.onTemplateEdited(data),
    cssClasses: 'text-primary',
    iconName: 'edit',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };


  tableSettings = new TableSettings({ actionsMode: 'inline' });

  tableConfiguration: TableConfiguration<EntityTemplatesListItem> = {
    tableRowsActionsList: [this.editAction],
    columns: this.tableColumns,
    data: [],
    dataCount: 3,//todo replace after api
    settings: this.tableSettings,
  };

  constructor(
  ) {
    super();
  }

  ngOnInit(): void {
    this.tableConfiguration.data = this.templatesList;
  }

  ngAfterViewInit(): void {
    this.table.refresh();
  }




  onTemplateEdited(_category: EntityTemplatesListItem) {
  }

  onTemplateDeleted(_category: EntityTemplatesListItem) {
  }

}
