import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { PagingConfig } from '@root/shared/models/table/page-configuration.model';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { PayrollListItem } from '../../models/payroll-list-item.model';

@Component({
  selector: 'app-payroll',
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PayrollComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<PayrollListItem>;

  pageSize = 10;
  pageIndex = 1;

  payrollsList: PayrollListItem[] = [
    {
      id: '1',
      name: 'tamara'
    },
    {
      id: '2',
      name: 'amin'
    },
    {
      id: '3',
      name: 'lynn'
    },
    {
      id: '2',
      name: 'amin'
    },
    {
      id: '3',
      name: 'lynn'
    },
    {
      id: '2',
      name: 'amin'
    },
    {
      id: '3',
      name: 'lynn'
    },
    {
      id: '2',
      name: 'amin'
    },
    {
      id: '3',
      name: 'lynn'
    },
    {
      id: '2',
      name: 'amin'
    },
    {
      id: '3',
      name: 'lynn'
    },
  ];

  tableColumns: TableColumn[] = [
    {
      translationKey: 'ID',
      property: 'id',
      type: 'text',
      svgIcon: '',
      cssClasses: () => 'w-[30%]',
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
      cssClasses: () => 'w-[30%]',
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
  ];

  tableSettings = new TableSettings({ actionsMode: 'inline', isLocalPaging: false });

  tableConfiguration: TableConfiguration<PayrollListItem> = {
    tableRowsActionsList: [],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };

  constructor(private layoutService: LayoutService) {
    super();
  }

  ngAfterViewInit(): void {
    //todo wait api response and update data table with data and data count
    this.tableConfiguration.data = this.payrollsList;
    this.tableConfiguration.dataCount = 30;
    this.table.refresh();
  }


  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.Payroll,
          translationKey: 'payroll.payroll'
        }
      ],
    });
  }


  onPaging(data: PagingConfig) {
    this.pageSize = data.pageSize;
    if (data.isNextPage) {
      this.pageIndex = this.pageIndex + 1;
    }
    else {
      this.pageIndex = this.pageIndex - 1;
    }
    //fetch the data
    console.log(data);
  }
}
