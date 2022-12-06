import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
// import { GeneralSystemSettingsFormGroup } from '../form-groups/general-system-settings-from-group.service';

@Component({
  selector: 'app-general-system-settings',
  templateUrl: './general-system-settings.component.html',
  styleUrls: ['./general-system-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GeneralSystemSettingsComponent implements OnInit {

  fg: FormGroup;
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    // private generalSystemSettingsFormGroup: GeneralSystemSettingsFormGroup
  ) { }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.SystemSetup,
          translationKey: 'system-setup.system-setup.system-setup'
        },
        {
          route: ApplicationRoutes.GeneralSystemSettings,
          translationKey: 'system-setup.system-setup.general-system-settings'
        }
      ],
    });
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  onHolidayAdded() {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.GeneralSystemSettings}`, {
      outlets: { sidenav: ApplicationRoutes.Add },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('over');
  }
}

