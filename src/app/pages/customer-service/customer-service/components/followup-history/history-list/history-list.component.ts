import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { Filter } from '@root/shared/models/table/filter.model';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableRowAction } from '@root/shared/models/table/table-row-action.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { TicketHistoryListItem } from '../../../models/ticket-history-list-item.model';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HistoryListComponent extends BaseComponent implements OnInit, AfterViewInit {

  constructor() { super(); }

  @Output() NextPageEvent = new EventEmitter<boolean>();
  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<TicketHistoryListItem>;
  pageSize = 3;
  pageIndex = 1;
  filter: Filter[];
  entityTypesList: BaseListItem[] = [
    { id: '1', name: 'type1' },
    { id: '1', name: 'type2' }
  ];
  happyIcon: TableRowAction<TicketHistoryListItem> = {
    action: (data) => this.onTicketEdited(data),
    cssClasses: 'text-primary',
    iconName: 'edit',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };
  entitiesList: TicketHistoryListItem[] = [
    {
      Date: '10/11/2023    10:54 A.M.',
      employeeName: 'Mohamad El Yousaf',
      Response: "customer-service-happy-icon"
    },
    {
      Date: '09/11/2023    11:12 A.M.',
      employeeName: 'Karim Moussa',
      Response: "customer-service-sad-nocolor-1-icon"
    },
    {
      Date: '08/11/2023    05:27 P.M.',
      employeeName: 'Mohamad El Yousaf',
      Response: "customer-service-full-sad"
    },
    {
      Date: '08/11/2023    05:27 P.M.',
      employeeName: 'Mohamad El Yousaf',
      Response: "customer-service-happy-icon"
    },
  ]
  tableColumns: TableColumn[] = [
    {
      translationKey: 'Date',
      property: 'Date',
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
      translationKey: 'employeeName',
      property: 'employeeName',
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
      translationKey: 'Response',
      property: 'Response',
      type: 'text',
      svgIcon: 'customer-service-happy-icon',
      cssClasses: () => 'text-primary',
      dataCssClasses: () => '',
      enableSort: true,
      hasFilter: true,
      visible: true,
      displayInFilterList: true,
      hasToolTip: false,
      showText: false,
      filter: {
        filterType: TableColumnFilterDataType.Text
      },
    },
    
  ];

 
  editAction: TableRowAction<TicketHistoryListItem> = {
    action: (data) => this.onTicketEdited(data),
    cssClasses: 'text-primary',
    iconName: 'edit',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  viewAction: TableRowAction<TicketHistoryListItem> = {
    action: (data) => this.onTicketViewed(data),
    cssClasses: 'text-primary',
    iconName: 'visibility',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  deleteAction: TableRowAction<TicketHistoryListItem> = {
    action: (data) => this.onTicketDeleted(data),
    cssClasses: 'text-red-500',
    iconName: 'delete',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  lockAction: TableRowAction<TicketHistoryListItem> = {
    action: (data) => this.onTicketLocked(data),
    cssClasses: 'text-black',
    iconName: 'lock',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  tableSettings = new TableSettings({ actionsMode: 'inline', pageSize: this.pageSize });

  tableConfiguration: TableConfiguration<TicketHistoryListItem> = {
    tableRowsActionsList: [this.viewAction, this.editAction, this.deleteAction, this.lockAction],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };



  ngOnInit(): void {
    this.tableConfiguration.data = this.entitiesList;
    this.tableConfiguration.dataCount = this.entitiesList.length;
  }

  ngAfterViewInit(): void {
    this.table.refresh();
  }

  onTicketEdited(_category: TicketHistoryListItem) {
    this.NextPageEvent.emit(true);
    console.log(true);
  }

  onTicketViewed(_category: TicketHistoryListItem) {

  }

  onTicketDeleted(_category: TicketHistoryListItem) {

  }

  onTicketLocked(_category: TicketHistoryListItem) {
  
  }

}
