import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { environment } from 'src/environments/environment';

import { MultiSelectFormGroup } from '../../form-groups/multi-select-form-group.service';
import { SingleSelectFormGroup } from '../../form-groups/single-select-form-group.service';
import { Module } from '../../../shared-system-setup/models/module.model';
import { AddRoleFormGroup } from '../../form-groups/add-role-from-group.service';
import { ClaimsFormGroup } from '../../form-groups/claims-form-group.service';
import { AddRole } from '../../models/add-role.model';
import { UserSecurityService } from '../../services/user-security.service';
import { claims$ } from '../../store/user-security.store';

@Component({
  selector: 'app-add-user-role',
  templateUrl: './add-user-role.component.html',
  styleUrls: ['./add-user-role.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserRoleComponent extends BaseComponent implements OnInit {

  fg: FormGroup;
  multiFormGroup: FormGroup;
  singleFormGroup: FormGroup;
  claimsFormGroup: FormGroup;
  addFormGroup: FormGroup;

  moduleList: Module[] = [];
  moduleClaims: any = []

  selectedOptions: any[] = [];
  claimSelectedOption: any[] = []
  selectedClaims = new Map<string, any>();
  claimsList: any[] = [];
  showClaims: boolean = false;
  id: string;

  constructor(
    private layoutService: LayoutService,
    private multiSelectFormGroup: MultiSelectFormGroup,
    private singleSelectFormGroup: SingleSelectFormGroup,
    private addRoleFormGroup: AddRoleFormGroup,
    private addClaimsFormGroup: ClaimsFormGroup,
    private userSecurityService: UserSecurityService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.add(
      claims$.subscribe((data) => {
        if (!this.id) {
          this.moduleList = data;
        }
      })
    );
    this.subscriptions.add(
      this.userSecurityService.getClaims$.subscribe((data) => {
        if (data) {
          this.claimsList = [];
          data.map((item: any) => {
            this.claimsList.push({ id: item.claimId, type: item.claimType, value: item.claimValue })
          })
        }
      })
    );

    this.activeRoute.paramMap.subscribe(params => {
      if (params.get('id')) {
        this.id = params.get('id');
        const roleName = params.get('id');
        this.userSecurityService.getClaimsByRole({ id: this.id, name: roleName });
        this.addFormGroup = this.addRoleFormGroup.getFormGroup({ claims: [], roleName: params.get('name') });
        this.multiFormGroup = this.multiSelectFormGroup.getFormGroup();
        this.singleFormGroup = this.singleSelectFormGroup.getFormGroup();
        this.claimsFormGroup = this.addClaimsFormGroup.getFormGroup([]);
      }
      else {
        this.claimsList = [];
        this.addFormGroup = this.addRoleFormGroup.getFormGroup();
        this.multiFormGroup = this.multiSelectFormGroup.getFormGroup();
        this.singleFormGroup = this.singleSelectFormGroup.getFormGroup();
        this.claimsFormGroup = this.addClaimsFormGroup.getFormGroup([]);
      }
    });

    this.userSecurityService.getClaims(`${environment.identityAPIServerURL}/Clients/3/ClaimGroups`)


    this.multiFormGroup.get("options").valueChanges.subscribe(value => {
      console.log(value);
      const newestClaimList = new Set();
      this.claimsList = this.claimsList.concat(value.filter((item: any) => { return !Array.isArray(item) }));
      this.claimsList = this.claimsList.filter((item: any) => {
        const isDuplicated = newestClaimList.has(item.value);
        newestClaimList.add(item.value)
        if (!isDuplicated) {
          return true
        }
        return false
      });

      console.log(this.claimsList);
    });
    this.singleFormGroup.get("option").valueChanges.subscribe(value => {
      this.moduleClaims = value.clientClaims;
    });
  }

  getFormControl(key: string): FormControl {
    return this.addFormGroup.controls[key] as FormControl;
  }

  getAddClaimForControl(key: string): FormArray {
    return this.claimsFormGroup.controls[key] as FormArray;
  }


  onSave(): void {
    if (this.addFormGroup.valid) {
      this.claimsList.map((value: any) => {
        this.addClaimsFormGroup.addClaim({ claimType: value.type, claimValue: value.value, claimId: value.id })
      });
      if (this.claimsFormGroup.valid) {
        let addRole: AddRole = {
          claims: this.addClaimsFormGroup.getValueFromFormGroup(this.claimsFormGroup).claims,
          roleName: this.addFormGroup.value.name,
        }
        if (this.id) {
          console.log(this.id);

          addRole.roleId = this.id
        }
        this.userSecurityService.addRole(addRole);
        this.navigate();
        this.layoutService.closeRightSideNav();
      }
    }
  }

  navigate() {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.UserSecurity}`]);
  }

  onCancel(): void {
    this.navigate();
    this.layoutService.closeRightSideNav();
  }


  getChipLabel(chip: any) {
    return chip.type + ' - ' + chip.value
  }

  removeChip(chip: any) {
    const index = this.claimsList.indexOf(chip, 0)
    this.claimsList.splice(index, 1)
  }

}

