import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
export class AddBranchComponent implements OnInit {
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
  ) { }

  ngOnInit(): void {
    this.fg = this.addBranchFormGroup.getFormGroup();
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
      console.log('Branch', this.level, this.parentId);

    });
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  onSave(): void {
    this.addBranchFormGroup.setLevel(this.level + 1);
    this.addBranchFormGroup.setParentId(this.parentId);
    this.addBranchFormGroup.setId(Math.floor(Math.random() * 10000));
    if (this.fg.valid) {
      console.log(this.fg.value);
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
