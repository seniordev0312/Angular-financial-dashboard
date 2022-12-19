import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserPolicyFormGroup } from '../../form-groups/user-policy-form-group.service';

@Component({
  selector: 'app-user-policies',
  templateUrl: './user-policies.component.html',
  styleUrls: ['./user-policies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPoliciesComponent implements OnInit {
  fg: FormGroup;
  constructor(private userPolicyFormGroup: UserPolicyFormGroup) { }

  ngOnInit(): void {
    this.fg = this.userPolicyFormGroup.getFormGroup();
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  onSave() {
    console.log(this.fg.value, this.fg.valid);

  }

}
