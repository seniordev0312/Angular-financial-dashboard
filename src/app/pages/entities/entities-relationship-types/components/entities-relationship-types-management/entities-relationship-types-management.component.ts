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
import { RelationshipTypesListItem } from '../../models/relationship-types-list-item.model';
import { EntitiesRelationshipTypesListService } from '../../services/entities-relationship-types-list.service';
import { relationshipTypesList$ } from '../../store/entities-relationship-types.store';

@Component({
  selector: 'app-entities-relationship-types-management',
  templateUrl: './entities-relationship-types-management.component.html',
  styleUrls: ['./entities-relationship-types-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesRelationshipTypesManagementComponent extends BaseComponent implements OnInit {

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<RelationshipTypesListItem>;
  addEntityRelationshipTypePermission = Permission.CanAddEntityRelationshipType;

  pageSize = 50;
  pageIndex = 1;
  filter: Filter[];
  relationshipTypesList: RelationshipTypesListItem[] = [];
  tableColumns: TableColumn[] = [
    {
      translationKey: 'Relationship Type Forward',
      property: 'forward',
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
      translationKey: 'Relationship Type Back',
      property: 'backward',
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
      translationKey: 'Relationship Type Description',
      property: 'description',
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
      translationKey: 'Allowed Entities',
      property: 'allowedEntities',
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
  ];

  lockAction: TableRowAction<RelationshipTypesListItem> = {
    action: () => { },
    cssClasses: 'text-black',
    iconName: 'lock',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: 'lock',
    isIconButton: true,
  };

  editAction: TableRowAction<RelationshipTypesListItem> = {
    action: (data) => this.onRelationshipTypeEdited(data),
    cssClasses: 'text-primary',
    iconName: 'border_color',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: 'canEdit',
    isIconButton: true,
  };

  deleteAction: TableRowAction<RelationshipTypesListItem> = {
    action: (data) => this.onRelationshipTypeDeleted(data),
    cssClasses: 'text-warn',
    iconName: 'delete_outline',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: 'canEdit',
    isIconButton: true,
  };

  tableSettings = new TableSettings({ actionsMode: 'inline', isLocalPaging: true, dynamicActions: true, controlActionsKey: 'lock' });

  tableConfiguration: TableConfiguration<RelationshipTypesListItem> = {
    tableRowsActionsList: [this.lockAction],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };

  constructor(private layoutService: LayoutService,
    private entitiesRelationshipTypesListService: EntitiesRelationshipTypesListService,
    private confirmationDialogService: ConfirmationDialogService,
    private securityCheckerService: SecurityCheckerService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.getActionsList();
    this.entitiesRelationshipTypesListService.getEntityRelationshipTypesList();
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesManagement}`,
          translationKey: 'Entity Management'
        },
        {
          route: ApplicationRoutes.EntitiesRelationshipTypesManagement,
          translationKey: 'Manage Entity Relationship Types'
        }
      ],
    });

    this.subscriptions.add(relationshipTypesList$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.relationshipTypesList = data;
        this.tableConfiguration.data = data.map(e => ({ ...e, canEdit: !e.lock }));
        this.tableConfiguration.dataCount = data.length;
        this.table?.refresh();
      }
    }))
  }

  getActionsList() {
    if (this.securityCheckerService.doesUserHasPermission(Permission.CanEditEntityRelationshipType)) {
      this.tableConfiguration.tableRowsActionsList.push(this.editAction);
    }
    if (this.securityCheckerService.doesUserHasPermission(Permission.CanDeleteEntityRelationshipType)) {
      this.tableConfiguration.tableRowsActionsList.push(this.deleteAction);
    }
  }

  onRelationshipTypeAdded() {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesRelationshipTypesManagement}`, {
      outlets: { sidenav: ApplicationRoutes.Add },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  onRelationshipTypeEdited(item: RelationshipTypesListItem) {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesRelationshipTypesManagement}`, {
      outlets: { sidenav: `${ApplicationRoutes.Add}/${item.entityTypeRelationshipId}` },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  onRelationshipTypeDeleted(type: RelationshipTypesListItem) {
    this.confirmationDialogService.open({
      description: 'Are you sure you want to delete this entity relationship type?',
      title: 'Delete Entity Relationship Type',
      icon: 'error_outline',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
      actionButtonsColor: 'warn',
      iconCssClasses: 'text-warn',
    });

    this.subscriptions.add(
      this.confirmationDialogService.confirmed().pipe(take(1)).subscribe((isConfirmed) => {
        if (isConfirmed) {
          this.entitiesRelationshipTypesListService.deleteType(type.entityTypeRelationshipId);
        }
      }));
  }
}
