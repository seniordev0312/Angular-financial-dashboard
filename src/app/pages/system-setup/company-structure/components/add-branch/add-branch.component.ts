import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from '@root/shared/services/layout.service';

import { AddBranchFormGroup } from '../../form-groups/add-branch-form-group.service';
// import { CompanyStructureService } from '../../services/company-structure.service';

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
  constructor(
    private layoutService: LayoutService,
    // private companyStructureService: CompanyStructureService,
    private addBranchFormGroup: AddBranchFormGroup,
    private router: Router,
  ) { }

  ngOnInit(): void {
    let result = this.router.url.split('?')[1].split('&');
    result.forEach((element, index) => {
      if (index === 0) {
        this.level = Number(element.split('=')[1]);
      }
      if (index === 1) {
        this.id = Number(element.split('=')[1]);
        if (this.id) {
          this.mode = 'Edit'
        } else {
          this.mode = 'Add'
        }
      }
    });
    this.fg = this.addBranchFormGroup.getFormGroup();
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  onSave(): void {
    // this.companyStructureService.addBranch()
    // this.layoutService.closeRightSideNav();
  }

  onCancel(): void {
    this.layoutService.closeRightSideNav();
  }

}
