import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '@root/shared/services/layout.service';
import { AddNewHolidayFormGroup } from '../../form-groups/add-new-holiday-from-group.service';

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
  ) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');
        const name = params.get('name');
        const startDate = params.get('startDate');
        const endDate = params.get('endDate');
        const offDay = params.get('offDay');
        this.fg = this.addNewHolidayFormGroup.getFormGroup({ endDate: endDate, startDate: startDate, name: name, id: Number(this.id), offDay: Boolean(offDay) });
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
    console.log(data);

    // this.layoutService.closeRightSideNav();
  }


  onCancel(): void {
    this.layoutService.closeRightSideNav();
  }


}
