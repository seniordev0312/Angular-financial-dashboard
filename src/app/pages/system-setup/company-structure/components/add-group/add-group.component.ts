import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AddGroupFormGroup } from '../../form-groups/add-group-form-group.service';
import { CompanyStructureService } from '../../services/company-structure.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddGroupComponent extends BaseComponent implements OnInit {
  fg: FormGroup;
  level: number;
  parentId: number;
  id: number;
  name: string;
  mode: string = 'Add';

  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private companyStructureService: CompanyStructureService,
    private addGroupFormGroup: AddGroupFormGroup,
  ) {
    super();
  }

  ngOnInit(): void {

    this.subscriptions.add(this.activeRoute.queryParams.subscribe(params => {
      this.parentId = params.parentId;
      this.id = params.id;
      this.name = params.name;
      if (this.id) {
        this.mode = 'Edit';
        this.fg = this.addGroupFormGroup.getFormGroup({ name: this.name, id: this.id, parentId: this.parentId });
        console.log(this.fg.value);

      } else {
        this.mode = 'Add';
        this.fg = this.addGroupFormGroup.getFormGroup();
      }
    }));
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  onSave(): void {
    this.addGroupFormGroup.setParentId(this.parentId);
    if (!this.id) {
      this.addGroupFormGroup.setId(Math.floor(Math.random() * 10000));
    }
    if (this.fg.valid) {
      this.companyStructureService.addGroup(this.fg.value);
      this.addGroupFormGroup.fg.reset()
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
