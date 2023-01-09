import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Output, EventEmitter, Input } from '@angular/core';
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
import { PolicyCardService } from '@root/pages/customer-service/policy-renewals/services/policy-card.service';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryListComponent
  extends BaseComponent
  implements OnInit, AfterViewInit
{
  constructor(public policyCardService: PolicyCardService) {
    super();
  }
  @Input() pageControl: string;
  @Input() actionFlag: number;
  @Input() data: any;
  @Output() NextPageEvent = new EventEmitter<boolean>();
  @Output() pageControlChange = new EventEmitter<any>();
  @Output() actionFlagChange = new EventEmitter<any>();

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<TicketHistoryListItem>;
  pageSize = 3;
  pageIndex = 1;
  filter: Filter[];
  entityTypesList: BaseListItem[] = [
    { id: '1', name: 'type1' },
    { id: '1', name: 'type2' },
  ];
  iconResponseName: string;
  historyList: {
    id: number;
    Date: string;
    employeeName: string;
    Response: string;
  }[] = [];
  historyData: {
    id: number;
    response: number;
    detailContent: string;
    policyPrice: string;
    additionalDetailContent: string;
    date: string;
  }[];

  happyIcon: TableRowAction<TicketHistoryListItem> = {
    action: (data) => this.onTicketEdited(data),
    cssClasses: 'text-primary',
    iconName: 'edit',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

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
        filterType: TableColumnFilterDataType.Text,
      },
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
        filterType: TableColumnFilterDataType.Text,
      },
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
        filterType: TableColumnFilterDataType.Text,
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

  tableSettings = new TableSettings({
    actionsMode: 'inline',
    pageSize: this.pageSize,
  });

  tableConfiguration: TableConfiguration<TicketHistoryListItem> = {
    tableRowsActionsList: [
      this.viewAction,
      this.editAction,
      this.deleteAction,
      this.lockAction,
    ],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };

  // get icon name according to the response value.
  displayIcon(response: number) {
    switch (response) {
      case 0:
        return 'customer-service-happy-icon';
      case 1:
        return 'customer-service-sad-color-2';
      default:
        return 'customer-service-sad-color-1';
    }
  }

  ngOnInit(): void {
    //define the type of historyData
    this.getHistoryData();
  }

  ngAfterViewInit(): void {
    this.table.refresh();
  }

  getHistoryData() {
    this.historyData = Object.values(this.data.detailsJson);

    for (let i = 0; i < this.historyData.length; i++) {
      let historyItem = {
        id: this.historyData[i].id,
        Response: this.displayIcon(this.historyData[i].response),
        employeeName: '',
        Date: new Date(this.historyData[i].date).toDateString(),
      };
      this.historyList.push(historyItem);
    }

    this.tableConfiguration.data = this.historyList;
    this.tableConfiguration.dataCount = this.historyList.length;
  }

  onTicketEdited(_category: TicketHistoryListItem) {
    // display other pages for editing
    this.pageControlChange.emit('next');
    // send id to edit.
    this.actionFlagChange.emit(_category.id);
  }

  onTicketViewed(_category: TicketHistoryListItem) {}

  onTicketDeleted(_category: TicketHistoryListItem) {
    this.historyData.splice(_category.id, 1);
    this.historyList.splice(_category.id, 1);

    for (let i = 0; i < this.historyData.length; i++) {
      this.historyData[i].id = i;
      this.historyList[i].id = i;
    }

    this.data.detailsJson = Object.assign({}, this.historyData);
    this.policyCardService.updatePolicyRenewalTickets(this.data);
    this.table.refresh();
  }

  onTicketLocked(_category: TicketHistoryListItem) {}
}
