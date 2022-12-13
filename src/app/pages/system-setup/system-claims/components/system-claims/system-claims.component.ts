import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { ClientClaim } from '@root/pages/system-setup/shared/models/client-claims.model';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { systemClaimsList$ } from '../../store/system-claims.store';
import { SystemClaimsService } from '../../services/system-claims.service';


@Component({
  selector: 'app-system-claims',
  templateUrl: './system-claims.component.html',
  styleUrls: ['./system-claims.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemClaimsComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<ClientClaim>;


  tableSettings = new TableSettings({ actionsMode: 'inline', pageSize: 20 });

  tableColumns: TableColumn[] = [
    {
      translationKey: 'Module',
      property: 'type',
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
      property: 'value',
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

  tableConfiguration: TableConfiguration<ClientClaim> = {
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
    tableRowsActionsList: []
  };

  constructor(
    private layoutService: LayoutService,
    private systemClaimsService: SystemClaimsService
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      systemClaimsList$.subscribe((data: ClientClaim[]) => {
        this.tableConfiguration.data = data;
        this.tableConfiguration.dataCount = data.length;
      })
    )
    this.systemClaimsService.getSystemClaims(0, 100);
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
