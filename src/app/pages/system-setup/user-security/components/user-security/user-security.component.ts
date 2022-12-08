import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { GroupProperty } from '@root/shared/models/table/table-group-property.model';
import { TableRowAction } from '@root/shared/models/table/table-row-action.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { UserSecurityFormGroup } from '../../form-groups/user-security-from-group.service';
import { Role } from '../../models/role.model';
@Component({
  selector: 'app-user-security',
  templateUrl: './user-security.component.html',
  styleUrls: ['./user-security.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSecurityComponent implements OnInit, AfterViewInit {

  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<Role>;

  fg: FormGroup;
  editAction: TableRowAction<Role> = {
    action: (data) => this.onRoleEdited(data),
    cssClasses: 'text-primary',
    iconName: 'edit',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  deleteAction: TableRowAction<Role> = {
    action: (data) => this.onRoleDeleted(data),
    cssClasses: 'text-warn',
    iconName: 'delete_outline',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  tableColumns: TableColumn[] = [
    {
      translationKey: 'name',
      property: 'name',
      type: 'text',
      svgIcon: '',
      cssClasses: () => 'w-[25%]',
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
      translationKey: 'description',
      property: 'description',
      type: 'text',
      cssClasses: () => 'w-[75%]',
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
    }
  ];

  groupingHeaderProperties: GroupProperty[] = [
    {
      hasToolTip: false,
      property: 'name',
      type: 'text',
      cssClasses: () => 'w-[25%]',
      icon: '',
      iconCssClass: '',
      toolTipText: '',
    },
    {
      hasToolTip: false,
      property: 'moduleName',
      type: 'text',
      cssClasses: () => 'w-[25%]',
      icon: '',
      iconCssClass: '',
      toolTipText: '',
    },
    {
      hasToolTip: false,
      property: 'description',
      type: 'text',
      cssClasses: () => 'w-[50%]',
      icon: '',
      iconCssClass: '',
      toolTipText: '',
    }
  ];

  tableSettings = new TableSettings({
    actionsMode: 'inline', isGropingMode: true, groupingHeaderProperties: this.groupingHeaderProperties, groupingProperty: 's'
  });



  tableConfiguration: TableConfiguration<Role> = {
    tableRowsActionsList: [this.editAction, this.deleteAction],
    columns: this.tableColumns,
    data: [],
    dataCount: 2,//todo replace after api
    settings: this.tableSettings,
  };

  constructor(
    private layoutService: LayoutService,
    private userSecurityFormGroup: UserSecurityFormGroup,
    private router: Router,
  ) { }

  templatesList: Role[] = [
    {
      description: 'BATATA 1231',
      name: 'batata 1231',
      claims: [
        {
          description: 'BATATA',
          moduleName: 'BATATA',
          name: 'BATATA'
        },
        {
          description: 'BATATA',
          moduleName: 'BATATA',
          name: 'BATATA'
        },
        {
          description: 'BATATA',
          moduleName: 'BATATA',
          name: 'BATATA'
        }
      ]
    },
    {
      description: 'BATATA',
      name: 'batata',
      claims: [
        {
          description: 'BATATA',
          moduleName: 'BATATA',
          name: 'BATATA'
        },
        {
          description: 'BATATA',
          moduleName: 'BATATA',
          name: 'BATATA'
        },
        {
          description: 'BATATA',
          moduleName: 'BATATA',
          name: 'BATATA'
        }
      ]
    }
  ]

  ngOnInit(): void {
    this.tableConfiguration.data = this.templatesList;
    this.fg = this.userSecurityFormGroup.getFormGroup();
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.SystemSetup,
          translationKey: 'system-setup.system-setup.system-setup'
        },
        {
          route: ApplicationRoutes.UserSecurity,
          translationKey: 'system-setup.system-setup.user-security'
        }
      ],
    });
  }

  ngAfterViewInit(): void {
    this.table.refresh();
  }

  onRoleDeleted(Role: Role) {
    console.log(Role);

  }
  onRoleEdited(Role: Role) {
    console.log(Role);

  }
  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  onUserRoleAdded() {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}`, {
      outlets: { sidenav: ApplicationRoutes.AddUserRole },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }
}