import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AddNewHolidayFormGroup } from '../../form-groups/add-new-holiday-from-group.service';
import { GeneralSystemSettingsService } from '../../services/general-system-settings.service';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddHolidayComponent implements OnInit {


  fg: FormGroup;
  id: string;
  constructor(
    private addNewHolidayFormGroup: AddNewHolidayFormGroup,
    private layoutService: LayoutService,
    private activeRoute: ActivatedRoute,
    private generalSystemSettingsService: GeneralSystemSettingsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      if (params.get('holidayId')) {
        this.id = params.get('holidayId');
        const name = params.get('name');
        const startDate = params.get('startDate');
        const endDate = params.get('endDate');
        const offDay = params.get('isOffDay');
        this.fg = this.addNewHolidayFormGroup.getFormGroup({ endDate: endDate, startDate: startDate, name: name, holidayId: this.id, isOffDay: Boolean(offDay) });
      }
      else {
        this.fg = this.addNewHolidayFormGroup.getFormGroup();
      }
    });
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  onSave(): void {
    const data = this.addNewHolidayFormGroup.getValueFromFormGroup(this.fg);
    if (this.fg.valid) {
      this.generalSystemSettingsService.addHoliday(data);
    }

    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.GeneralSystemSettings}`]);
    this.layoutService.closeRightSideNav();
  }


  onCancel(): void {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.GeneralSystemSettings}`]);
    this.layoutService.closeRightSideNav();
  }


}
