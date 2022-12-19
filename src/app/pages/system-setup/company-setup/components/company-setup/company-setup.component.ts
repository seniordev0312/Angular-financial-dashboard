import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { CompanySetupFormGroup } from '../../form-groups/company-setup-form-group.service';

@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrls: ['./company-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanySetupComponent implements OnInit {
  fg: FormGroup;
  constructor(private layoutService: LayoutService,
    private companySetupFormGroup: CompanySetupFormGroup) { }

  ngOnInit(): void {
    this.fg = this.companySetupFormGroup.getFormGroup();
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.SystemSetup,
          translationKey: 'system-setup.system-setup'
        },
        {
          route: ApplicationRoutes.CompanySetup,
          translationKey: 'system-setup.company-setup'
        }
      ],
    });
  }

  onSave(): void {
    console.log(this.fg.valid, this.fg.value);

  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

}
