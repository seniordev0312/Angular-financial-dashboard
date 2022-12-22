import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BaseComponent } from '@root/shared/components/base-component/base-component';

import { UserPolicyFormGroup } from '../../form-groups/user-policy-form-group.service';
import { UserSecurityService } from '../../services/user-security.service';
import { userPolicies$ } from '../../store/user-security.store';

@Component({
  selector: 'app-user-policies',
  templateUrl: './user-policies.component.html',
  styleUrls: ['./user-policies.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPoliciesComponent extends BaseComponent implements OnInit {
  fg: FormGroup;
  constructor(
    private userPolicyFormGroup: UserPolicyFormGroup,
    private userSecurityService: UserSecurityService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.fg = this.userPolicyFormGroup.getFormGroup();
    this.subscriptions.add(
      userPolicies$.subscribe((data: any) => {
        console.log('userPolicyFormGroup', data);
        this.userPolicyFormGroup.getFormGroup(data);
      })
    )
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  onSave() {
    console.log(this.fg.value, this.fg.valid);
    if (this.fg.valid) {
      this.userSecurityService.saveUserPolices(this.fg.value);
    }
  }

}
