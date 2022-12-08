import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SystemClaims } from '../../models/system-claims.model';


@Component({
  selector: 'app-system-claims',
  templateUrl: './system-claims.component.html',
  styleUrls: ['./system-claims.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemClaimsComponent implements OnInit, AfterViewInit {

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<SystemClaims>;

  templatesList: SystemClaims[] = [
    {
      module: 'Entity Management',
      claim: 'Access Module',
      description: 'This Claim allows accessing Entity Management',
    },
    {
      module: 'Entity Management',
      claim: 'Allow Edit Entity Type',
      description: 'This Claim allows editing an Entity Type',
    },
    {
      module: 'Entity Management',
      claim: 'Allow Delete Entity Type',
      description: 'This Claim allows deleting an Entity Type',
    },
    {
      module: 'Entity Management',
      claim: 'Allow Create Entity Type',
      description: 'This Claim allows creating an Entity Type',
    },
    {
      module: 'Accounting',
      claim: 'Access Module',
      description: 'This Claim allows accessing the Accounting Module',
    },
    {
      module: 'Accounting',
      claim: 'Allow Access Cashier',
      description: 'The Claim allows accessing the Accounting - Cashier',
    },
    {
      module: 'Accounting',
      claim: 'Allow Access Payables',
      description: 'The Claim allows accessing the Accounting - Payables',
    },
    {
      module: 'Accounting',
      claim: 'Allow Access Receivables',
      description: 'The Claim allows accessing the Accounting - Receivables',
    },
    {
      module: 'Accounting',
      claim: 'Allow Access General Accounting',
      description: 'The Claim allows accessing the Accounting - General Accounting',
    },
    {
      module: 'Entity Management',
      claim: 'Allow Edit KYC Document',
      description: 'The Claim allows editing a KYC Document',
    },
    {
      module: 'Entity Management',
      claim: 'Allow Delete KYC Document',
      description: 'The Claim allows deleting a KYC Document',
    },
    {
      module: 'Customer Service',
      claim: 'Access Module',
      description: 'This Claim allows accessing the Customer Service Module',
    },
  ]

  tableSettings = new TableSettings({ enableActions: false });

  tableColumns: TableColumn[] = [
    {
      translationKey: 'Module',
      property: 'module',
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
      translationKey: 'Claim',
      property: 'claim',
      type: 'text',
      cssClasses: () => 'w-[35%]',
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
    },
    {
      translationKey: 'Description',
      property: 'description',
      type: 'text',
      cssClasses: () => 'w-[50%]',
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

  tableConfiguration: TableConfiguration<SystemClaims> = {
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
          translationKey: 'system-setup.system-setup.system-setup'
        },
        {
          route: ApplicationRoutes.SystemClaims,
          translationKey: 'system-setup.system-setup.system-claims'
        }
      ],
    });
  }

  ngAfterViewInit(): void {
    this.table.refresh();
  }
}
