import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
export class AddDepartmentComponent implements OnInit {
  fg: FormGroup;
  level: number;
  parentId: number;
  id: number;
  mode: string = 'Add';
  constructor(
    private layoutService: LayoutService,
    private companyStructureService: CompanyStructureService,
    private addDepartmentFormGroup: AddDepartmentFormGroup,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fg = this.addDepartmentFormGroup.getFormGroup();
    let result = this.router.url.split('?')[1].split('&');
    result.forEach((element, index) => {
      if (index === 0) {
        this.level = Number(element.split('=')[1]);
      }
      if (index === 1) {
        this.parentId = Number(element.split('=')[1]);
      }
      if (index === 2) {
        this.id = Number(element.split('=')[1]);
        if (this.id) {
          this.mode = 'Edit'
        } else {
          this.mode = 'Add'
        }
      }
      console.log('Department', this.level, this.parentId);
    });
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  onSave(): void {
    this.addDepartmentFormGroup.setLevel(this.level + 1);
    this.addDepartmentFormGroup.setParentId(this.parentId);
    this.addDepartmentFormGroup.setId(Math.floor(Math.random() * 10000));
    if (this.fg.valid) {
      console.log(this.fg.value);
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
