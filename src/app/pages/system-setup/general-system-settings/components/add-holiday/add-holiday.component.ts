import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  constructor(
    private addNewHolidayFormGroup: AddNewHolidayFormGroup,
    private layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    this.fg = this.addNewHolidayFormGroup.getFormGroup();
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  onSave(): void {
    const data = this.addNewHolidayFormGroup.getValueFromFormGroup(this.fg);
    console.log(data);

    this.layoutService.closeRightSideNav();
  }


  onCancel(): void {
    this.layoutService.closeRightSideNav();
  }


}
