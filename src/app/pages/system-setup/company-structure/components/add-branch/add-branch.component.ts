import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

import { AddBranchFormGroup } from '../../form-groups/add-branch-form-group.service';
import { CompanyStructureService } from '../../services/company-structure.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBranchComponent extends BaseComponent implements OnInit {
  fg: FormGroup;
  mode: string = 'Add';
  level: number;
  id: number;
  parentId: number;
  constructor(
    private layoutService: LayoutService,
    private companyStructureService: CompanyStructureService,
    private addBranchFormGroup: AddBranchFormGroup,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.fg = this.addBranchFormGroup.getFormGroup();
    this.subscriptions.add(this.activeRoute.queryParams.subscribe(params => {
      this.parentId = params.parentId;
      this.id = params.id;
      if (this.id) {
        this.mode = 'Edit'
      } else {
        this.mode = 'Add'
      }
    }));
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  onSave(): void {
    this.addBranchFormGroup.setParentId(this.parentId);
    if (!this.id) {
      this.addBranchFormGroup.setId(Math.floor(Math.random() * 10000));
    }
    if (this.fg.valid) {
      this.companyStructureService.addBranch(this.fg.value);
      this.addBranchFormGroup.fg.reset()
      this.layoutService.closeRightSideNav();
      this.navigate();
    }
  }

  navigate() {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.CompanyStructure}`]);
  }

  onCancel(): void {
    this.layoutService.closeRightSideNav();
    this.navigate();
  }

}
