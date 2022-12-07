import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
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
import { EntitiesListItem } from '../../models/entities-list-item.model';

@Component({
  selector: 'app-entities-list-management',
  templateUrl: './entities-list-management.component.html',
  styleUrls: ['./entities-list-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesListManagementComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<EntitiesListItem>;
  pageSize = 50;
  pageIndex = 1;
  filter: Filter[];
  templatesList: EntitiesListItem[] = [
    {
      id: '1',
      code: '1',
      name: 'FirstName',
      description: 'An entity representing a potential client, current client, previous client, or third'
    },
    {
      id: '1',
      code: '1',
      name: 'FirstName',
      description: 'An entity representing a potential client, current client, previous client, or third'
    },
    {
      id: '1',
      code: '1',
      name: 'FirstName',
      description: 'An entity representing a potential client, current client, previous client, or third'
    },
    {
      id: '1',
      code: '1',
      name: 'FirstName',
      description: 'An entity representing a potential client, current client, previous client, or third'
    },
    {
      id: '1',
      code: '1',
      name: 'FirstName',
      description: 'An entity representing a potential client, current client, previous client, or third'
    },
  ]
  tableColumns: TableColumn[] = [
    {
      translationKey: 'Entity Code',
      property: 'code',
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
      translationKey: 'Entity',
      property: 'name',
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
      translationKey: 'Entity Description',
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
  ];

  editAction: TableRowAction<EntitiesListItem> = {
    action: (data) => this.onEntityEdited(data),
    cssClasses: 'text-primary',
    iconName: 'edit',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  deleteAction: TableRowAction<EntitiesListItem> = {
    action: (data) => this.onEntityDeleted(data),
    cssClasses: 'text-warn',
    iconName: 'delete_outline',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };


  tableSettings = new TableSettings({ actionsMode: 'inline' });

  tableConfiguration: TableConfiguration<EntitiesListItem> = {
    tableRowsActionsList: [this.editAction, this.deleteAction],
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
          route: ApplicationRoutes.EntitiesListManagement,
          translationKey: 'Manage Entity'
        }
      ],
    });
  }

  ngAfterViewInit(): void {
    this.table.refresh();
  }

  onEntityAdded() {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesListManagement}/${ApplicationRoutes.Add}`]);
  }


  onEntityEdited(template: EntitiesListItem) {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesListManagement}/${ApplicationRoutes.Add}/${template.id}`]);
  }

  onEntityDeleted(_template: EntitiesListItem) {
    this.confirmationDialogService.open({
      description: 'Are you sure you want to delete this entity?',
      title: 'Delete Entity',
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