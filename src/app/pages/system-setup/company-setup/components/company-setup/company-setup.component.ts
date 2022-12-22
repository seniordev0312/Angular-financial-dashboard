import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { generalSystemSettings$ } from '@root/pages/system-setup/general-system-settings/store/general-system-settings.store';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { CompanySetupFormGroup } from '../../form-groups/company-setup-form-group.service';
import { CompanySetupAPI, Extensions } from '../../models/APIs/company-setup-api.model';
// import { CompanySetup } from '../../models/company-setup.model';
import { CompanySetupService } from '../../services/company-setup.service';
import { companySetup$ } from '../../store/company-setup.store';

@Component({
  selector: 'app-company-setup',
  templateUrl: './company-setup.component.html',
  styleUrls: ['./company-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CompanySetupComponent extends BaseComponent implements OnInit {
  fg: FormGroup;
  companyName: string;
  constructor(private layoutService: LayoutService,
    private companySetupFormGroup: CompanySetupFormGroup,
    private companySetupService: CompanySetupService
  ) {
    super();
  }
  ngOnInit(): void {
    this.fg = this.companySetupFormGroup.getFormGroup();
    this.subscriptions.add(
      generalSystemSettings$.subscribe(data => {
        this.companyName = data.companyName;
      }));
    this.subscriptions.add(
      companySetup$.subscribe(data => {
        let companySetup = {
          address: data.address,
          website: data.website,
          email: data.email,
          phoneNumber: data.phoneNumber,
          avayaCentral: false,
          avayaAPIKeyInformation: '',
          avayaAPISecretKey: '',

          twilioWhatsApp: false,
          twilioWhatsAppAPIKeyInformation: '',
          twilioWhatsAppAPISecretKey: '',

          twilioSendGrid: false,
          twilioAPIKeyInformation: '',
          twilioAPISecretKey: '',

          SMSProxireach: false,
          SMSProxireachAPIKeyInformation: '',
          SMSProxireachAPISecretKey: '',
        }
        data.extensions.forEach((item: any, index: number) => {
          if (index === 0) {
            companySetup.avayaCentral = item.isEnable;
            companySetup.avayaAPIKeyInformation = item.extensionDetails.apiKeyInformation;
            companySetup.avayaAPISecretKey = item.extensionDetails.apiSecret
          }
          if (index === 1) {
            companySetup.twilioWhatsApp = item.isEnable;
            companySetup.twilioWhatsAppAPIKeyInformation = item.extensionDetails.apiKeyInformation;
            companySetup.twilioWhatsAppAPISecretKey = item.extensionDetails.apiSecret
          }
          if (index === 2) {
            companySetup.twilioSendGrid = item.isEnable;
            companySetup.twilioAPIKeyInformation = item.extensionDetails.apiKeyInformation;
            companySetup.twilioAPISecretKey = item.extensionDetails.apiSecret
          }
          if (index === 3) {
            companySetup.SMSProxireach = item.isEnable;
            companySetup.SMSProxireachAPIKeyInformation = item.extensionDetails.apiKeyInformation;
            companySetup.SMSProxireachAPISecretKey = item.extensionDetails.apiSecret

          }
        });
        this.fg = this.companySetupFormGroup.getFormGroup(companySetup);
      })
    )
    this.companySetupService.getCompanySetup();
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
    if (this.fg.valid) {
      const data: CompanySetupAPI = {
        address: this.fg.controls['address'].value,
        email: this.fg.controls['email'].value,
        phoneNumber: this.fg.controls['phoneNumber'].value,
        website: this.fg.controls['website'].value,
        extensions: [],
      }
      let extension1: Extensions = {
        name: 'Avaya Central',
        isEnable: this.fg.controls['avayaCentral'].value,
        extensionDetails: {
          apiKeyInformation: this.fg.controls['avayaAPIKeyInformation'].value,
          apiSecret: this.fg.controls['avayaAPISecretKey'].value,
        }
      }
      let extension2: Extensions = {
        name: 'Twilio WhatsApp',
        isEnable: this.fg.controls['twilioWhatsApp'].value,
        extensionDetails: {
          apiKeyInformation: this.fg.controls['twilioWhatsAppAPIKeyInformation'].value,
          apiSecret: this.fg.controls['twilioWhatsAppAPISecretKey'].value,
        }
      }
      let extension3: Extensions = {
        name: 'Twilio Send Grid',
        isEnable: this.fg.controls['twilioSendGrid'].value,
        extensionDetails: {
          apiKeyInformation: this.fg.controls['twilioAPIKeyInformation'].value,
          apiSecret: this.fg.controls['twilioAPISecretKey'].value,
        }
      }
      let extension4: Extensions = {
        name: 'SMS Proxireach',
        isEnable: this.fg.controls['SMSProxireach'].value,
        extensionDetails: {
          apiKeyInformation: this.fg.controls['SMSProxireachAPIKeyInformation'].value,
          apiSecret: this.fg.controls['SMSProxireachAPISecretKey'].value,
        }
      }
      data.extensions.push(extension1);
      data.extensions.push(extension2);
      data.extensions.push(extension3);
      data.extensions.push(extension4);
      this.companySetupService.updateCompanySetup(data)
    }
  }
  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }
}
