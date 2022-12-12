import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
import { TableColumn } from '@root/shared/models/table/table-column.model';
import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
import { TableRowAction } from '@root/shared/models/table/table-row-action.model';
import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { GeneralSystemSettingsFormGroup } from '../../form-groups/general-system-settings-from-group.service';
import { Holiday } from '../../models/holiday.model';

@Component({
  selector: 'app-general-system-settings',
  templateUrl: './general-system-settings.component.html',
  styleUrls: ['./general-system-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSystemSettingsComponent implements OnInit, AfterViewInit {
  @ViewChild(WidgetTableComponent)
  table: WidgetTableComponent<Holiday>;
  templatesList: Holiday[] = [
    {
      endDate: '10/11/2023',
      name: 'Eid El Adha',
      offDay: true,
      startDate: '10/11/2023'
    },
    {
      endDate: '05/7/2023',
      name: 'Eid El Saydeh',
      offDay: true,
      startDate: '05/7/2023'
    },
    {
      endDate: '11/11/2023',
      name: 'Independence Day',
      offDay: true,
      startDate: '11/11/2023'
    },
    {
      endDate: '05/06/2023',
      name: 'Eid Marmaroun',
      offDay: false,
      startDate: '04/06/2023'
    },
    {
      endDate: '26/12/2023',
      name: 'Christmas',
      offDay: true,
      startDate: '23/12/2023'
    },
    {
      endDate: '31/12/2023',
      name: 'New Year',
      offDay: false,
      startDate: '29/12/2023'
    },
    {
      endDate: '05/7/2023',
      name: 'Eid El Saydeh',
      offDay: true,
      startDate: '05/7/2023'
    },
    {
      endDate: '11/11/2023',
      name: 'Independence Day',
      offDay: true,
      startDate: '11/11/2023'
    },
    {
      endDate: '05/06/2023',
      name: 'Eid Marmaroun',
      offDay: false,
      startDate: '04/06/2023'
    },
    {
      endDate: '26/12/2023',
      name: 'Christmas',
      offDay: true,
      startDate: '23/12/2023'
    },
    {
      endDate: '31/12/2023',
      name: 'New Year',
      offDay: false,
      startDate: '29/12/2023'
    }
  ]
  fg: FormGroup;

  ofDayTypesList: BaseListItem[] = [
    { id: '0', name: 'true' },
    { id: '1', name: 'false' }
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
      translationKey: '',
      property: 'offDay',
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
        filterType: TableColumnFilterDataType.DropDown,
        selectListViewProperty: 'name',
        selectOptionsList: this.ofDayTypesList
      }
    },
  ];

  tableConfiguration: TableConfiguration<Holiday> = {
    tableRowsActionsList: [this.editAction, this.deleteAction],
    columns: this.tableColumns,
    data: [],
    dataCount: 0,//todo replace after api
    settings: this.tableSettings,
  };

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private generalSystemSettingsFormGroup: GeneralSystemSettingsFormGroup
  ) { }

  ngOnInit(): void {
    this.tableConfiguration.data = this.templatesList;
    this.tableConfiguration.dataCount = this.templatesList.length;
    this.fg = this.generalSystemSettingsFormGroup.getFormGroup();
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.SystemSetup,
          translationKey: 'system-setup.system-setup.system-setup'
        },
        {
          route: ApplicationRoutes.GeneralSystemSettings,
          translationKey: 'system-setup.system-setup.general-system-settings'
        }
      ],
    });
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
    console.log(data);
  }

  onHolidayEdited(data: Holiday) {
    console.log(data);
  }
  onSave() {

  }


}

