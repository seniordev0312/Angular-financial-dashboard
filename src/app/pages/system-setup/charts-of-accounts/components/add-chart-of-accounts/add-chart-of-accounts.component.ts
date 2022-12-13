import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { DialogMode } from '@root/shared/models/enums/dialog-mode.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { AddChartOfAccountFormGroup } from '../../form-groups/add-chart-of-account-form-group.service';

@Component({
  selector: 'app-add-chart-of-accounts',
  templateUrl: './add-chart-of-accounts.component.html',
  styleUrls: ['./add-chart-of-accounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddChartOfAccountsComponent extends BaseComponent implements OnInit {

  fg: FormGroup;
  mode: DialogMode = DialogMode.Add;
  constructor(private addChartOfAccountFormGroup: AddChartOfAccountFormGroup,
    private activeRoute: ActivatedRoute,
    private layoutService: LayoutService) { super(); }

  get isParentAccountDisabled(): boolean {
    return this.fg && this.fg.get('parentAccount').disabled;
  }

  ngOnInit(): void {
    this.subscriptions.add(this.activeRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.mode = DialogMode.Edit;
        //todo wait fetch api
        this.fg = this.addChartOfAccountFormGroup.getFormGroup();
      }
      else {
        this.fg = this.addChartOfAccountFormGroup.getFormGroup();
      }
    }));

    this.subscriptions.add(this.activeRoute.queryParamMap.subscribe(params => {
      if (params.get('isLeafItem') === 'true') {
        this.fg.get('parentAccount').disable();
        this.fg.get('parentAccount').removeValidators(Validators.required);
      }
    }));

    this.subscriptions.add(this.fg.get('isNewGroup').valueChanges.subscribe(data => {
      if (!data) {
        this.fg.get('parentAccount').disable();
        this.fg.get('parentAccount').removeValidators(Validators.required);
      }
      else {
        this.fg.get('parentAccount').enable();
        this.fg.get('parentAccount').addValidators(Validators.required);
      }
    }))
  }

  onSave(): void {
    this.layoutService.closeRightSideNav();
  }


  onClose(): void {
    this.layoutService.closeRightSideNav();
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  isCreateMode() {
    return this.mode === DialogMode.Add;
  }

  isUpdateMode() {
    return this.mode === DialogMode.Edit;
  }

}
