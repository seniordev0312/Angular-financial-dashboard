import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
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
import { EntitiesSourcesListItem } from '../../models/entities-sources-list-item.model';
import { EntitiesSourcesListService } from '../../services/entities-sources-list.service';
import { entitiesSourcesList$ } from '../../store/entities-sources.store';

@Component({
  selector: 'app-entities-sources-management',
  templateUrl: './entities-sources-management.component.html',
  styleUrls: ['./entities-sources-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesSourcesManagementComponent extends BaseComponent implements OnInit {
  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<EntitiesSourcesListItem>;
  addEntitySourcesPermission = Permission.CanAddEntitySources;

  pageSize = 50;
  pageIndex = 1;
  filter: Filter[];
  sourcesList: EntitiesSourcesListItem[] = [];
  tableColumns: TableColumn[] = [
    {
      translationKey: 'Entity Source ID',
      property: 'entitySourceId',
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
      translationKey: 'Source Name',
      property: 'sourceName',
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
    {
      translationKey: '',
      property: '',
      type: 'text',
      cssClasses: () => 'w-[40%]',
      dataCssClasses: () => '',
      enableSort: false,
      hasFilter: false,
      visible: true,
      displayInFilterList: true,
      hasToolTip: false,
      showText: true,
    },
  ];

  editAction: TableRowAction<EntitiesSourcesListItem> = {
    action: (data) => this.onEntitySourceEdited(data),
    cssClasses: 'text-primary',
    iconName: 'border_color',
    translationKey: '',
    alwaysShow: false,
    showConditionProperty: 'isNotLockModification',
    isIconButton: true,
  };

  deleteAction: TableRowAction<EntitiesSourcesListItem> = {
    action: (data) => this.onEntitySourceDeleted(data),
    cssClasses: 'text-warn',
    iconName: 'delete_outline',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  shareAction: TableRowAction<EntitiesSourcesListItem> = {
    action: (data) => this.onTemplateShared(data),
    cssClasses: 'text-accent',
    iconName: 'share',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  tableSettings = new TableSettings({ actionsMode: 'inline', isLocalPaging: true });

  tableConfiguration: TableConfiguration<EntitiesSourcesListItem> = {
    tableRowsActionsList: [this.shareAction],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };

  constructor(private layoutService: LayoutService,
    private confirmationDialogService: ConfirmationDialogService,
    private securityCheckerService: SecurityCheckerService,
    private entitiesSourcesListService: EntitiesSourcesListService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.entitiesSourcesListService.getEntitiesSourcesList();
    this.getActionsList();
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

    this.subscriptions.add(entitiesSourcesList$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.sourcesList = data;
        this.tableConfiguration.data = data.map(e => {
          return {
            ...e, isNotLockModification: !e.isLockModification
          }
        });
        this.tableConfiguration.dataCount = data.length;
        this.table.refresh();
      }
    }))
  }


  getActionsList() {
    if (this.securityCheckerService.doesUserHasPermission(Permission.CanEditEntitySources)) {
      this.tableConfiguration.tableRowsActionsList.push(this.editAction);
    }
    if (this.securityCheckerService.doesUserHasPermission(Permission.CanDeleteEntitySources)) {
      this.tableConfiguration.tableRowsActionsList.push(this.deleteAction);
    }
  }


  onEntitySourceAdded() {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesSourcesManagement}`, {
      outlets: { sidenav: ApplicationRoutes.Add },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }


  onEntitySourceEdited(template: EntitiesSourcesListItem) {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesSourcesManagement}`, {
      outlets: { sidenav: `${ApplicationRoutes.Add}/${template.entitySourceId}` },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  onEntitySourceDeleted(source: EntitiesSourcesListItem) {
    this.confirmationDialogService.open({
      description: 'Are you sure you want to delete this entity source?',
      title: 'Delete Entity Source',
      icon: 'error_outline',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
      actionButtonsColor: 'warn',
      iconCssClasses: 'text-warn',
    });

    this.subscriptions.add(
      this.confirmationDialogService.confirmed().pipe(take(1)).subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.entitiesSourcesListService.deleteSource(source.entitySourceId)
        }
      }));
  }

  onTemplateShared(source: EntitiesSourcesListItem) {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesMappingManagement}/${source.entitySourceId}`]);
  }
}
