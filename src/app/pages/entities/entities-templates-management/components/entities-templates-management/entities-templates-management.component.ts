import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
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
import { EntitiesTemplatesListService } from '../../services/entities-templates-list.service';
import { templatesList$ } from '../../store/entities-templates.store';

@Component({
  selector: 'app-entities-templates-management',
  templateUrl: './entities-templates-management.component.html',
  styleUrls: ['./entities-templates-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesTemplatesManagementComponent extends BaseComponent implements OnInit {
  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<EntityTemplatesListItem>;
  filter: Filter[];
  templatesList: EntityTemplatesListItem[] = [];
  tableColumns: TableColumn[] = [
    {
      translationKey: 'Entity Section Templates ID',
      property: 'entitySectionTemplateId',
      type: 'text',
      svgIcon: '',
      cssClasses: () => (''),
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
      cssClasses: () => (''),
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
      cssClasses: () => (''),
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
    dataCount: 0,
    settings: this.tableSettings,
  };

  constructor(private layoutService: LayoutService,
    private confirmationDialogService: ConfirmationDialogService,
    private entitiesTemplatesListService: EntitiesTemplatesListService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.entitiesTemplatesListService.getEntitiesTemplatesList();
    this.subscriptions.add(templatesList$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.templatesList = data;
        this.tableConfiguration.data = data;
        this.tableConfiguration.dataCount = data.length;
        this.table.refresh();
      }
    }));
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

  onTemplateAdded() {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesTemplates}`, {
      outlets: { sidenav: ApplicationRoutes.Add },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }


  onTemplateEdited(template: EntityTemplatesListItem) {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesTemplates}`, {
      outlets: { sidenav: `${ApplicationRoutes.Add}/${template.entitySectionTemplateId}` },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  onTemplateDeleted(template: EntityTemplatesListItem) {
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
        if (isConfirmed) {
          this.entitiesTemplatesListService.deleteTemplate(template.entitySectionTemplateId);
        }
      }));
  }

  onTemplateViewed(template: EntityTemplatesListItem) {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesTemplates}`, {
      outlets: { sidenav: `${ApplicationRoutes.Add}/${template.entitySectionTemplateId}` },
    }], { skipLocationChange: true, queryParams: { isViewMode: true } });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }
}
