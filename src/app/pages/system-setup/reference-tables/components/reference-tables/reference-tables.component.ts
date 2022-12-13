import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { ReferenceTables } from '../../model/reference-tables.model';

@Component({
  selector: 'app-reference-tables',
  templateUrl: './reference-tables.component.html',
  styleUrls: ['./reference-tables.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferenceTablesComponent implements OnInit, AfterViewInit {

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<ReferenceTables>;

  templatesList: ReferenceTables[] = [
    {
      referenceType: 'Country',
      referenceValue: 'Lebanon'
    },
    {
      referenceType: 'Country',
      referenceValue: 'Zambia'
    },
    {
      referenceType: 'Country',
      referenceValue: 'United States of America'
    },
    {
      referenceType: 'Country',
      referenceValue: 'United Arab Emirates'
    },
    {
      referenceType: 'Country',
      referenceValue: 'Uruguay'
    },
    {
      referenceType: 'Country',
      referenceValue: 'Spain'
    },
    {
      referenceType: 'Country',
      referenceValue: 'United Kingdom'
    },
    {
      referenceType: 'Country',
      referenceValue: 'Jordan'
    },
    {
      referenceType: 'Country',
      referenceValue: 'Egypt'
    },
    {
      referenceType: 'Country',
      referenceValue: 'Kuwait'
    },
    {
      referenceType: 'Currency',
      referenceValue: 'USD'
    },
    {
      referenceType: 'Account Type',
      referenceValue: 'Liability'
    },
  ]


  tableColumns: TableColumn[] = [
    {
      translationKey: 'referenceType',
      property: 'referenceType',
      type: 'text',
      svgIcon: '',
      cssClasses: () => 'w-[25%]',
      dataCssClasses: () => 'flex w-full',
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
      translationKey: 'referenceValue',
      property: 'referenceValue',
      type: 'text',
      cssClasses: () => 'w-[75%]',
      dataCssClasses: () => 'flex w-full',
      enableSort: true,
      hasFilter: true,
      visible: true,
      displayInFilterList: true,
      hasToolTip: false,
      showText: true,
      filter: {
        filterType: TableColumnFilterDataType.Text
      }
    }
  ];

  tableSettings = new TableSettings({ actionsMode: 'inline', pageSize: 5, enableActions: false });

  tableConfiguration: TableConfiguration<ReferenceTables> = {
    columns: this.tableColumns,
    data: [],
    dataCount: 3,
    settings: this.tableSettings,
    tableRowsActionsList: []
  };

  constructor(private layoutService: LayoutService) { }

  ngOnInit(): void {

    this.tableConfiguration.data = this.templatesList;
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.SystemSetup,
          translationKey: 'system-setup.system-setup'
        },
        {
          route: ApplicationRoutes.ReferenceTables,
          translationKey: 'system-setup.reference-tables'
        }
      ],
    });
  }
  ngAfterViewInit(): void {
    this.table.refresh();
  }

}
