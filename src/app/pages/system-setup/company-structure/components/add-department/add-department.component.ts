import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

import { AddDepartmentFormGroup } from '../../form-groups/add-department-form-group.service';
import { CompanyStructureService } from '../../services/company-structure.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddDepartmentComponent extends BaseComponent implements OnInit {
  fg: FormGroup;
  level: number;
  parentId: number;
  id: number;
  mode: string = 'Add';
  constructor(
    private layoutService: LayoutService,
    private companyStructureService: CompanyStructureService,
    private addDepartmentFormGroup: AddDepartmentFormGroup,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {
    super();
  }
  ngOnInit(): void {
    this.fg = this.addDepartmentFormGroup.getFormGroup();
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
    this.addDepartmentFormGroup.setParentId(this.parentId);
    if (!this.id) {
      this.addDepartmentFormGroup.setId(Math.floor(Math.random() * 10000));
    }
    if (this.fg.valid) {
      this.companyStructureService.addDepartment(this.fg.value);
      this.addDepartmentFormGroup.fg.reset()
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
