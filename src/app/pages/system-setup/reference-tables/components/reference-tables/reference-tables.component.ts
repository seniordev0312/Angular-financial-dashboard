import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { ReferenceTables } from '../../model/reference-tables.model';
import { ReferenceTablesService } from '../../services/reference-tables.service';
import { referenceTables$ } from '../../store/reference-tables.store';

@Component({
  selector: 'app-reference-tables',
  templateUrl: './reference-tables.component.html',
  styleUrls: ['./reference-tables.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReferenceTablesComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<ReferenceTables>;
  canAddRelationshipTypePermission = Permission.CanAddRelationshipType;
  templatesList: ReferenceTables[] = [];


  tableColumns: TableColumn[] = [
    {
      translationKey: 'Type',
      property: 'key',
      type: 'text',
      cssClasses: () => 'w-[33.33%]',
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
      translationKey: 'value',
      property: 'value',
      type: 'text',
      svgIcon: '',
      cssClasses: () => 'w-[33.33%]',
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
      translationKey: 'code',
      property: 'code',
      type: 'text',
      cssClasses: () => 'w-[33.33%]',
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
  ];

  tableSettings = new TableSettings({ actionsMode: 'inline', pageSize: 5, isLocalPaging: true });

  tableConfiguration: TableConfiguration<ReferenceTables> = {
    columns: this.tableColumns,
    data: [],
    dataCount: 10,
    settings: this.tableSettings,
    tableRowsActionsList: []
  };

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private referenceTablesService: ReferenceTablesService,
    private cdr: ChangeDetectorRef
  ) {
    super();
  }

  ngOnInit(): void {
    this.tableConfiguration.data = [];
    this.tableConfiguration.dataCount = 10;
    this.subscriptions.add(
      referenceTables$.subscribe((data) => {
        if (data) {
          this.tableConfiguration.data = data;
          this.tableConfiguration.dataCount = this.templatesList.length;
          this.cdr.detectChanges();
          this.table.refresh();
        }
      })
    );
    this.subscriptions.add(
      this.referenceTablesService.addReferenceTables$.subscribe(() => {
        this.referenceTablesService.getReferenceTables(0, 1000);
      })
    );
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
    this.referenceTablesService.getReferenceTables(0, 1000);
  }
  ngAfterViewInit(): void {
    this.table.refresh();
  }

  AddReferenceTable() {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.ReferenceTables}`, {
      outlets: {
        sidenav: ApplicationRoutes.Add
      },
    }], { skipLocationChange: true });

    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }
}
