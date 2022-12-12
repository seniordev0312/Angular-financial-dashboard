import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { Filter } from '@root/shared/models/table/filter.model';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableRowAction } from '@root/shared/models/table/table-row-action.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { ConfirmationDialogService } from '@root/shared/notifications/services/dialog-confirmation.service';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { take } from 'rxjs';
import { EntityTemplatesListItem } from '../../models/entity-templates-list-item.model';

@Component({
  selector: 'app-entities-templates-management',
  templateUrl: './entities-templates-management.component.html',
  styleUrls: ['./entities-templates-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesTemplatesManagementComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<EntityTemplatesListItem>;
  pageSize = 50;
  pageIndex = 1;
  filter: Filter[];
  templatesList: EntityTemplatesListItem[] = [
    {
      id: 1,
      name: '222',
      description: 'oooooo'
    },
    {
      id: 1,
      name: 'Address Template',
      description: 'All fields and verification for address input with map integration'
    },
    {
      id: 1,
      name: 'Address Template',
      description: 'All fields and verification for address input with map integration'
    },
    {
      id: 1,
      name: 'Address Template',
      description: 'oooooo'
    }
  ]
  tableColumns: TableColumn[] = [
    {
      translationKey: 'Entity Section Templates ID',
      property: 'id',
      type: 'text',
      svgIcon: '',
      cssClasses: () => (window.innerWidth <= 740 ? 'w-[120px]' : 'w-1/5'),
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
      translationKey: 'Section Template Name',
      property: 'name',
      type: 'text',
      cssClasses: () => (window.innerWidth <= 740 ? 'w-[120px]' : 'w-1/5'),
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
      translationKey: 'Section Description',
      property: 'description',
      type: 'text',
      cssClasses: () => (window.innerWidth <= 740 ? 'w-[240px]' : 'w-2/5'),
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

  editAction: TableRowAction<EntityTemplatesListItem> = {
    action: (data) => this.onTemplateEdited(data),
    cssClasses: 'text-primary',
    iconName: 'border_color',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  deleteAction: TableRowAction<EntityTemplatesListItem> = {
    action: (data) => this.onTemplateDeleted(data),
    cssClasses: 'text-warn',
    iconName: 'delete_outline',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  viewAction: TableRowAction<EntityTemplatesListItem> = {
    action: (data) => this.onTemplateViewed(data),
    cssClasses: 'text-accent',
    iconName: 'visibility',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  tableSettings = new TableSettings({ actionsMode: 'inline', isLocalPaging: true });

  tableConfiguration: TableConfiguration<EntityTemplatesListItem> = {
    tableRowsActionsList: [this.viewAction, this.editAction, this.deleteAction],
    columns: this.tableColumns,
    data: [],
    dataCount: 3,//todo replace after api
    settings: this.tableSettings,
  };

  constructor(private layoutService: LayoutService,
    private confirmationDialogService: ConfirmationDialogService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.tableConfiguration.data = this.templatesList;
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesManagement}`,
          translationKey: 'Entity Management'
        },
        {
          route: ApplicationRoutes.EntitiesTemplates,
          translationKey: 'Manage Entity Section Templates'
        }
      ],
    });
  }

  ngAfterViewInit(): void {
    this.table.refresh();
  }

  onTemplateAdded() {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesTemplates}`, {
      outlets: { sidenav: ApplicationRoutes.Add },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }


  onTemplateEdited(template: EntityTemplatesListItem) {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesTemplates}`, {
      outlets: { sidenav: `${ApplicationRoutes.Add}/${template.id}` },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  onTemplateDeleted(_template: EntityTemplatesListItem) {
    this.confirmationDialogService.open({
      description: 'Are you sure you want to delete this template?',
      title: 'Delete Template',
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

  onTemplateViewed(_template: EntityTemplatesListItem) {
  }
}
