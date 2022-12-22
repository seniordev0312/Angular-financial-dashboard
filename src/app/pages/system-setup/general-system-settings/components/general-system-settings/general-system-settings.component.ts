import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableRowAction } from '@root/shared/models/table/table-row-action.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { ConfirmationDialogService } from '@root/shared/notifications/services/dialog-confirmation.service';
import { LayoutService } from '@root/shared/services/layout.service';
import { SecurityCheckerService } from '@root/shared/services/security-checker.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { take } from 'rxjs';
import { GeneralSystemSettingsFormGroup } from '../../form-groups/general-system-settings-from-group.service';
import { Holiday } from '../../models/holiday.model';
import { GeneralSystemSettingsService } from '../../services/general-system-settings.service';
import { accountingStyle$, country$, defaultCurrency$, defaultLanguages$, generalSystemSettings$, holidays$ } from '../../store/general-system-settings.store';

@Component({
  selector: 'app-general-system-settings',
  templateUrl: './general-system-settings.component.html',
  styleUrls: ['./general-system-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSystemSettingsComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<Holiday>;
  addGeneralSystemSetupPermission = Permission.CanAddGeneralSystemSetup;

  templatesList: Holiday[] = [];
  fg: FormGroup;

  ofDayTypesList: BaseListItem[] = [
    { id: '0', value: 'true' },
    { id: '1', value: 'false' },
    { id: '1', value: 'ALL' },
  ];

  defaultLanguage: BaseListItem[] = [];
  country: BaseListItem[] = [];
  defaultCurrency: BaseListItem[] = [];
  accountingStyle: BaseListItem[] = [];
  years: BaseListItem[] = [
    {
      id: '2022',
      value: '2022'
    },
    {
      id: '2023',
      value: '2023'
    },
    {
      id: '2024',
      value: '2024'
    },
    {
      id: '2025',
      value: '2025'
    },
    {
      id: '2026',
      value: '2026'
    },
  ];

  editAction: TableRowAction<Holiday> = {
    action: (data) => this.onHolidayEdited(data),
    cssClasses: 'text-primary',
    iconName: 'border_color',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  deleteAction: TableRowAction<Holiday> = {
    action: (data) => this.onHolidayDeleted(data),
    cssClasses: 'text-warn',
    iconName: 'delete_outline',
    translationKey: '',
    alwaysShow: true,
    showConditionProperty: null,
    isIconButton: true,
  };

  tableSettings = new TableSettings({ actionsMode: 'inline', pageSize: 10 });

  tableColumns: TableColumn[] = [
    {
      translationKey: 'Holiday Name',
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
      translationKey: 'Start Date',
      property: 'startDate',
      type: 'text',
      cssClasses: () => 'w-[25%]',
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
    },
    {
      translationKey: 'End Date',
      property: 'endDate',
      type: 'text',
      cssClasses: () => 'w-[25%]',
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
      translationKey: 'Off Day',
      property: 'isOffDay',
      type: 'bool',
      cssClasses: () => 'w-[25%]',
      dataCssClasses: () => (window.innerWidth > 740 ? '' : 'text-center'),
      enableSort: false,
      hasFilter: true,
      visible: true,
      displayInFilterList: true,
      hasToolTip: false,
      showText: true,
      filter: {
        filterType: TableColumnFilterDataType.Text,
      }
    },
  ];

  tableConfiguration: TableConfiguration<Holiday> = {
    tableRowsActionsList: [],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,//todo replace after api
    settings: this.tableSettings,
  };

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private generalSystemSettingsFormGroup: GeneralSystemSettingsFormGroup,
    private securityCheckerService: SecurityCheckerService,
    private confirmationDialogService: ConfirmationDialogService,
    private generalSystemSettingsService: GeneralSystemSettingsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.fg = this.generalSystemSettingsFormGroup.getFormGroup();
    this.generalSystemSettingsService.getGeneralSystemSettings();
    this.subscriptions.add(
      this.generalSystemSettingsService.addHoliday$.subscribe(() => {
        this.generalSystemSettingsService.getHolidays(0, 1000);
      }));
    this.subscriptions.add(
      holidays$.subscribe(data => {
        if (data) {
          this.templatesList = data;
          this.tableConfiguration.data = data;
          this.tableConfiguration.dataCount = data.length;
          this.table.refresh();
        }
      }));
    this.subscriptions.add(
      defaultLanguages$.subscribe(data => {
        if (!this.isEmpty(data)) {
          this.defaultLanguage = []
          data.forEach((item: any) => {
            this.defaultLanguage.push({ id: item.code, value: item.value })
          });
        }
      }));
    this.subscriptions.add(
      defaultCurrency$.subscribe(data => {
        if (!this.isEmpty(data)) {
          this.defaultCurrency = []
          data.forEach((item: any) => {
            this.defaultCurrency.push({ id: item.code, value: item.value })
          });
        }
      }));
    this.subscriptions.add(
      accountingStyle$.subscribe(data => {
        if (!this.isEmpty(data)) {
          this.accountingStyle = [];
          data.forEach((item: any) => {
            this.accountingStyle.push({ id: item.code, value: item.value })
          });
        }
      }));
    this.subscriptions.add(
      country$.subscribe(data => {
        if (!this.isEmpty(data)) {
          this.country = []
          data.forEach((item: any) => {
            this.country.push({ id: item.code, value: item.value })
          });
        }
      }));
    this.subscriptions.add(
      generalSystemSettings$.subscribe(data => {
        data.fiscalYear = data.fiscalYear.toString();
        data.underwritingYear = data.underwritingYear.toString();
        this.fg = this.generalSystemSettingsFormGroup.getFormGroup(data);
      }));
    this.generalSystemSettingsService.getHolidays(0, 1000)
    this.getActionsList();
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.SystemSetup,
          translationKey: 'system-setup.system-setup'
        },
        {
          route: ApplicationRoutes.GeneralSystemSettings,
          translationKey: 'system-setup.general-system-settings'
        }
      ],
    });
  }

  getActionsList() {
    if (this.securityCheckerService.doesUserHasPermission(Permission.CanEditGeneralSystemSetup)) {
      this.tableConfiguration.tableRowsActionsList.push(this.editAction);
    }
    if (this.securityCheckerService.doesUserHasPermission(Permission.CanDeleteGeneralSystemSetup)) {
      this.tableConfiguration.tableRowsActionsList.push(this.deleteAction);
    }
  }
  ngAfterViewInit(): void {
    this.table.refresh();
  }
  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }
  onHolidayAdded() {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.GeneralSystemSettings}`, {
      outlets: {
        sidenav: ApplicationRoutes.Add
      },
    }], { skipLocationChange: true });

    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }
  onHolidayDeleted(data: Holiday) {
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
          this.generalSystemSettingsService.deleteHoliday(data)
        }
      }));
  }
  onHolidayEdited(data: Holiday) {
    console.log(data);
    // this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.UserSecurity}`, {
    //   outlets: {
    //     sidenav: `${ApplicationRoutes.Add}/${userRolesListItem.id}/${userRolesListItem.name}`
    //   },
    // }], {
    //   skipLocationChange: true,
    //   queryParams: {
    //     id: userRolesListItem.id,
    //     name: userRolesListItem.name,
    //   }
    // },
    // );
    // this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.GeneralSystemSettings}`, {
    //   outlets: {
    //     sidenav: `${ApplicationRoutes.Add}/${data.holidayId}/${data.name}/${data.startDate}/${data.endDate}/${data.isOffDay}`
    //   },
    // }], {
    //   queryParams: {
    //     id: data.holidayId,
    //     name: data.name,
    //     startDate: data.name,
    //     endDate: data.name,
    //     offDay: data.isOffDay
    //   }
    // });
    // this.layoutService.openRightSideNav();
    // this.layoutService.changeRightSideNavMode('over');

  }
  onSave() {
    if (this.fg.value) {
      this.generalSystemSettingsService.updateGeneralSystemSettings(this.generalSystemSettingsFormGroup.getValueFromFormGroup(this.fg))
    }
  }
}