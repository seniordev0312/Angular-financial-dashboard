import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { Filter } from '@root/shared/models/table/filter.model';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableRowAction } from '@root/shared/models/table/table-row-action.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { ConfirmationDialogService } from '@root/shared/notifications/services/dialog-confirmation.service';
import { LayoutService } from '@root/shared/services/layout.service';
import { SecurityCheckerService } from '@root/shared/services/security-checker.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { take } from 'rxjs';
import { EntitiesMappingListItem } from '../../models/entities-mapping-list-item.model';

@Component({
  selector: 'app-entities-mapping-management',
  templateUrl: './entities-mapping-management.component.html',
  styleUrls: ['./entities-mapping-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesMappingManagementComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<EntitiesMappingListItem>;
  addEntityMappingPermission = Permission.CanAddEntityMapping;

  pageSize = 50;
  pageIndex = 1;
  filter: Filter[];
  templatesList: EntitiesMappingListItem[] = [
    {
      id: '1',
      externalField: 'FirstName',
      systemField: 'First_Name'
    },
    {
      id: '1',
      externalField: 'FirstName',
      systemField: 'First_Name'
    },
    {
      id: '1',
      externalField: 'FirstName',
      systemField: 'First_Name'
    },
    {
      id: '1',
      externalField: 'FirstName',
      systemField: 'First_Name'
    },
    {
      id: '1',
      externalField: 'FirstName',
      systemField: 'First_Name'
    },
  ]
  tableColumns: TableColumn[] = [
    {
      translationKey: 'Mapping ID',
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
      translationKey: 'External Field',
      property: 'externalField',
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
      translationKey: 'System Field',
      property: 'systemField',
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
  ];

  editAction: TableRowAction<EntitiesMappingListItem> = {
    action: (data) => this.onEntitySourceEdited(data),
    cssClasses: 'text-primary',
    iconName: 'border_color',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  deleteAction: TableRowAction<EntitiesMappingListItem> = {
    action: (data) => this.onEntitySourceDeleted(data),
    cssClasses: 'text-warn',
    iconName: 'delete_outline',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };


  tableSettings = new TableSettings({ actionsMode: 'inline', isLocalPaging: true });

  tableConfiguration: TableConfiguration<EntitiesMappingListItem> = {
    tableRowsActionsList: [],
    columns: this.tableColumns,
    data: [],
    dataCount: 3,//todo replace after api
    settings: this.tableSettings,
  };

  constructor(private layoutService: LayoutService,
    private confirmationDialogService: ConfirmationDialogService,
    private securityCheckerService: SecurityCheckerService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.getActionsList();
    this.tableConfiguration.data = this.templatesList;
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesManagement}`,
          translationKey: 'Entity Management'
        },
        {
          route: ApplicationRoutes.EntitiesSourcesManagement,
          translationKey: 'Manage Entity Sources & Mappings'
        }
      ],
    });
  }

  ngAfterViewInit(): void {
    this.table.refresh();
  }

  getActionsList() {
    if (this.securityCheckerService.doesUserHasPermission(Permission.CanEditEntityManagement)) {
      this.tableConfiguration.tableRowsActionsList.push(this.editAction);
    }
    if (this.securityCheckerService.doesUserHasPermission(Permission.CanDeleteEntityMapping)) {
      this.tableConfiguration.tableRowsActionsList.push(this.deleteAction);
    }
  }

  onEntitySourceAdded() {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesMappingManagement}`, {
      outlets: { sidenav: ApplicationRoutes.Add },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }


  onEntitySourceEdited(template: EntitiesMappingListItem) {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesMappingManagement}`, {
      outlets: { sidenav: `${ApplicationRoutes.Add}/${template.id}` },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  onEntitySourceDeleted(_template: EntitiesMappingListItem) {
    this.confirmationDialogService.open({
      description: 'Are you sure you want to delete this entity mapping?',
      title: 'Delete Entity Mapping',
      icon: 'error_outline',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
      actionButtonsColor: 'warn',
      iconCssClasses: 'text-warn',
    });

    this.subscriptions.add(
      this.confirmationDialogService.confirmed().pipe(take(1)).subscribe((isConfirmed) => {
        if (isConfirmed) { }
      }));
  }
}
