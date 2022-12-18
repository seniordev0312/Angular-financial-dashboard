import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { DialogMode } from '@root/shared/models/enums/dialog-mode.model';
import { FormArrayService } from '@root/shared/services/form-array.service';
import { LayoutService } from '@root/shared/services/layout.service';
import { AddRoleFormGroup } from '../../form-groups/add-role-form-group.service';
import { ClaimFormGroup } from '../../form-groups/claim-form-group.service';
import { Claim } from '../../models/claim.model';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddRoleComponent implements OnInit {
  fg: FormGroup;
  claimFg: FormGroup;
  mode: DialogMode = DialogMode.Add;
  claimsList: BaseListItem[] = [
    {
      id: '1',
      value: 'valueee'
    },
    {
      id: '11',
      value: 'valiiiieee'
    },
    {
      id: '12',
      value: 'vawwwwwlueee'
    }
  ];
  modulesList: BaseListItem[] = [
    {
      id: '12',
      value: 'module'
    },
    {
      id: '17',
      value: 'module2'
    }
  ];

  constructor(private addRoleFormGroup: AddRoleFormGroup,
    private activeRoute: ActivatedRoute,
    private claimFormGroup: ClaimFormGroup,
    private formArrayService: FormArrayService,
    private layoutService: LayoutService) { }

  ngOnInit(): void {
    this.claimFg = this.claimFormGroup.getFormGroup();
    this.activeRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.mode = DialogMode.Edit;
        //todo wait fetch api
        this.fg = this.addRoleFormGroup.getFormGroup();
      }
      else {
        this.fg = this.addRoleFormGroup.getFormGroup();
      }
    });
  }

  onSave(): void {
    this.layoutService.closeRightSideNav();
  }


  onClose(): void {
    this.layoutService.closeRightSideNav();
  }

  getFormControl(key: string, fg: FormGroup): FormControl {
    return fg.controls[key] as FormControl;
  }

  isCreateMode() {
    return this.mode === DialogMode.Add;
  }

  isUpdateMode() {
    return this.mode === DialogMode.Edit;
  }

  onNewClaimAdded() {
    const data: Claim = this.claimFormGroup.getValueFromFormGroup(this.claimFg);
    Array.from(data.claimValue).forEach((value => {
      const claimItem: Claim = {
        claimId: data.claimId,
        claimType: data.claimType,
        claimValue: value
      };
      this.formArrayService.getFormArrayItems('claims', this.fg).push(this.claimFormGroup.getFormGroup(claimItem));
    }))
    this.claimFg.reset();
  }
}
