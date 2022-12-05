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
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { RelationshipTypesListItem } from '../../models/relationship-types-list-item.model';

@Component({
  selector: 'app-entities-relationship-types-management',
  templateUrl: './entities-relationship-types-management.component.html',
  styleUrls: ['./entities-relationship-types-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesRelationshipTypesManagementComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<RelationshipTypesListItem>;
  pageSize = 50;
  pageIndex = 1;
  filter: Filter[];
  relationshipTypesList: RelationshipTypesListItem[] = [
    {
      id: ' 1',
      code: '1',
      forward: 'Father Of',
      back: 'Child Of',
      allowedEntities: ['1', '3'],
      description: 'Parent child relationship link'
    },
    {
      id: ' 1',
      code: '1',
      forward: 'Father Of',
      back: 'Child Of',
      allowedEntities: ['1', '3'],
      description: 'Parent child relationship link'
    },
    {
      id: ' 1',
      code: '1',
      forward: 'Father Of',
      back: 'Child Of',
      allowedEntities: ['1', '3'],
      description: 'Parent child relationship link'
    },
    {
      id: ' 1',
      code: '1',
      forward: 'Father Of',
      back: 'Child Of',
      allowedEntities: ['1', '3'],
      description: 'Parent child relationship link'
    },
    {
      id: ' 1',
      code: '1',
      forward: 'Father Of',
      back: 'Child Of',
      allowedEntities: ['1', '3'],
      description: 'Parent child relationship link'
    },
    {
      id: ' 1',
      code: '1',
      forward: 'Father Of',
      back: 'Child Of',
      allowedEntities: ['1', '3'],
      description: 'Parent child relationship link'
    },
    {
      id: ' 1',
      code: '1',
      forward: 'Father Of',
      back: 'Child Of',
      allowedEntities: ['1', '3'],
      description: 'Parent child relationship link'
    },
    {
      id: ' 1',
      code: '1',
      forward: 'Father Of',
      back: 'Child Of',
      allowedEntities: ['1', '3'],
      description: 'Parent child relationship link'
    },
    {
      id: ' 1',
      code: '1',
      forward: 'Father Of',
      back: 'Child Of',
      allowedEntities: ['1', '3'],
      description: 'Parent child relationship link'
    }
  ]
  tableColumns: TableColumn[] = [
    {
      translationKey: 'Code',
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
      translationKey: 'Forward',
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
      translationKey: 'Back',
      property: 'back',
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
      translationKey: 'Description',
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
    cssClasses: 'text-primary',
    iconName: 'lock',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };


  tableSettings = new TableSettings({ actionsMode: 'inline' });

  tableConfiguration: TableConfiguration<RelationshipTypesListItem> = {
    tableRowsActionsList: [this.lockAction],
    columns: this.tableColumns,
    data: [],
    dataCount: 3,//todo replace after api
    settings: this.tableSettings,
  };

  constructor(private layoutService: LayoutService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.tableConfiguration.data = this.relationshipTypesList;
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.EntitiesManagement,
          translationKey: 'Entity Management'
        },
        {
          route: ApplicationRoutes.EntitiesRelationshipTypesManagement,
          translationKey: 'Manage Entity Relationship Types'
        }
      ],
    });
  }

  ngAfterViewInit(): void {
    this.table.refresh();
  }

  onRelationshipTypeAdded() {
    this.router.navigate([ApplicationRoutes.EntitiesRelationshipTypesManagement, {
      outlets: { sidenav: ApplicationRoutes.AddRelationshipType },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

}
