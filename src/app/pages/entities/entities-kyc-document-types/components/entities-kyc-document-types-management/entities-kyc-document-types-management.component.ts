import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { Alignment } from '@root/shared/models/table/enum/column-alignment.enum';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableRowAction } from '@root/shared/models/table/table-row-action.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { SecurityCheckerService } from '@root/shared/services/security-checker.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { KYCDocumentListItem } from '../../models/kyc-document-types-list-item.model';
import { EntitiesDocumentsListService } from '../../services/entities-documents-list.service';
import { documentsList$ } from '../../store/entities-kyc-document.store';

@Component({
  selector: 'app-entities-kyc-document-types-management',
  templateUrl: './entities-kyc-document-types-management.component.html',
  styleUrls: ['./entities-kyc-document-types-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesKycDocumentTypesManagementComponent extends BaseComponent implements OnInit {
  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<KYCDocumentListItem>;
  addEntityKYCDocumentPermission = Permission.CanAddEntityKYCDocument;
  data: KYCDocumentListItem[] = [];
  tableColumns: TableColumn[] = [
    {
      translationKey: 'KYC Document Type',
      property: 'kycDocumentType',
      type: 'text',
      cssClasses: () => '',
      dataCssClasses: () => (''),
      enableSort: true,
      hasFilter: true,
      visible: true,
      displayInFilterList: true,
      hasToolTip: false,
      showText: true,
      filter: {
        filterType: TableColumnFilterDataType.Text
      },
      alignment: Alignment.Right
    },
    {
      translationKey: 'Template Processing Key Information',
      property: 'templateProcessingKeyInformation',
      type: 'text',
      cssClasses: () => '',
      dataCssClasses: () => (''),
      enableSort: false,
      hasFilter: true,
      visible: true,
      displayInFilterList: true,
      hasToolTip: false,
      showText: true,
      filter: {
        filterType: TableColumnFilterDataType.Text
      },
      alignment: Alignment.Right
    },
  ];

  editAction: TableRowAction<KYCDocumentListItem> = {
    action: (data) => this.onDocumentTypeEdited(data),
    cssClasses: 'text-primary',
    iconName: 'border_color',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  tableSettings = new TableSettings({
    actionsMode: 'inline',
    isLocalPaging: true,
    hasSlideAction: true,
    slideActionProperty: 'isActive'
  });

  tableConfiguration: TableConfiguration<KYCDocumentListItem> = {
    tableRowsActionsList: [],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,
    settings: this.tableSettings,
  };

  constructor(private layoutService: LayoutService,
    private securityCheckerService: SecurityCheckerService,
    private entitiesDocumentsListService: EntitiesDocumentsListService,
    private router: Router) {
    super();
  }

  ngOnInit(): void {
    this.entitiesDocumentsListService.getDocumentsList();

    this.getActionsList();
 	this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: `${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesManagement}`,
          translationKey: 'Entity Management'
        },
        {
          route: ApplicationRoutes.EntitiesKYCDocumentTypesManagement,
          translationKey: 'Manage KYC Document Types'
        }
      ],
    });

    this.subscriptions.add(documentsList$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.data = data;
        this.tableConfiguration.data = data;
        this.tableConfiguration.dataCount = data.length;
        this.table?.refresh();
      }
    }));
    
    }
    
  getActionsList() {
    if (this.securityCheckerService.doesUserHasPermission(Permission.CanEditEntityKYCDocument)) {
      this.tableConfiguration.tableRowsActionsList.push(this.editAction);
    }
    if (this.securityCheckerService.doesUserHasPermission(Permission.CanDeleteEntityManagement)) {
      this.tableConfiguration.columns.push(
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
      );
    }
  }



  onDocumentTypeAdded() {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesKYCDocumentTypesManagement}`, {
      outlets: { sidenav: ApplicationRoutes.Add },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }


  onDocumentTypeEdited(documentType: KYCDocumentListItem) {
    this.router.navigate([`${ApplicationRoutes.Entities}/${ApplicationRoutes.EntitiesKYCDocumentTypesManagement}`, {
      outlets: { sidenav: `${ApplicationRoutes.Add}/${documentType.templateProcessingKeyInformation}` },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }

  onItemActivated(event: { value: boolean, item: KYCDocumentListItem }) {
    this.entitiesDocumentsListService.activateDocument(event.item.templateProcessingKeyInformation, event.value);
  }
}
