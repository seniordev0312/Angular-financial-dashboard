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
import { KYCDocumentInterfaceListItem } from '../../models/kyc-document-types-list-item.model';

@Component({
  selector: 'app-entities-kyc-document-types-management',
  templateUrl: './entities-kyc-document-types-management.component.html',
  styleUrls: ['./entities-kyc-document-types-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesKycDocumentTypesManagementComponent extends BaseComponent implements OnInit, AfterViewInit {

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<KYCDocumentInterfaceListItem>;
  pageSize = 50;
  pageIndex = 1;
  filter: Filter[];
  templatesList: KYCDocumentInterfaceListItem[] = [
    {
      id: '1',
      code: '1',
      information: 'CGI9-1028-YUIW-C3OP',
      process: true,
      type: 'Passport'
    },
    {
      id: '1',
      code: '1',
      information: 'CGI9-1028-YUIW-C3OP',
      process: true,
      type: 'Passport'
    },
    {
      id: '1',
      code: '1',
      information: 'CGI9-1028-YUIW-C3OP',
      process: true,
      type: 'Passport'
    },
    {
      id: '1',
      code: '1',
      information: 'CGI9-1028-YUIW-C3OP',
      process: true,
      type: 'Passport'
    },
    {
      id: '1',
      code: '1',
      information: 'CGI9-1028-YUIW-C3OP',
      process: true,
      type: 'Passport'
    },
  ]
  tableColumns: TableColumn[] = [
    {
      translationKey: 'KYC Document Type Code',
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
      translationKey: 'KYC Document Type',
      property: 'type',
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
      translationKey: 'Template Processing Key Information',
      property: 'information',
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
    {
      translationKey: 'Process',
      property: 'process',
      type: 'bool',
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

  editAction: TableRowAction<KYCDocumentInterfaceListItem> = {
    action: (data) => this.onDocumentTypeEdited(data),
    cssClasses: 'text-primary',
    iconName: 'edit',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };



  tableSettings = new TableSettings({ actionsMode: 'inline' });

  tableConfiguration: TableConfiguration<KYCDocumentInterfaceListItem> = {
    tableRowsActionsList: [this.editAction],
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
    this.tableConfiguration.data = this.templatesList;
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.EntitiesManagement,
          translationKey: 'Entity Management'
        },
        {
          route: ApplicationRoutes.EntitiesKYCDocumentTypesManagement,
          translationKey: 'Manage KYC Document Types'
        }
      ],
    });
  }

  ngAfterViewInit(): void {
    this.table.refresh();
  }

  onDocumentTypeAdded() {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesKYCDocumentTypesManagement}`, {
      outlets: { sidenav: ApplicationRoutes.Add },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }


  onDocumentTypeEdited(documentType: KYCDocumentInterfaceListItem) {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesKYCDocumentTypesManagement}`, {
      outlets: { sidenav: `${ApplicationRoutes.Add}/${documentType.id}` },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

}
