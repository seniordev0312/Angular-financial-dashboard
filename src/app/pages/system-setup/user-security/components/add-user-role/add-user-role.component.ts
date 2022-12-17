import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
import { LayoutService } from '@root/shared/services/layout.service';

import { MultiSelectFormGroup } from '../../form-groups/multi-select-form-group.service';
import { SingleSelectFormGroup } from '../../form-groups/single-select-form-group.service';
import { Module } from '../../../shared-system-setup/models/module.model';
import { AddClaim } from '../../models/add-claim.model';
import { AddRoleFormGroup } from '../../form-groups/add-role-from-group.service';
import { ClaimsFormGroup } from '../../form-groups/claims-form-group.service';
import { UserSecurityService } from '../../services/user-security.service';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { environment } from 'src/environments/environment';
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

  constructor(
    private layoutService: LayoutService,
    private multiSelectFormGroup: MultiSelectFormGroup,
    private singleSelectFormGroup: SingleSelectFormGroup,
    private addRoleFormGroup: AddRoleFormGroup,
    private addClaimsFormGroup: ClaimsFormGroup,
    private userSecurityService: UserSecurityService,
    // private activeRoute: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    // this.activeRoute.paramMap.subscribe(params => {
    //   if (params.get('id')) {
    //     //get the Role item and claimsList
    //     this.addFormGroup = this.addRoleFormGroup.getFormGroup();
    //   }
    //   else {
    //     this.addFormGroup = this.addRoleFormGroup.getFormGroup();
    //     this.multiFormGroup = this.multiSelectFormGroup.getFormGroup();
    //     this.singleFormGroup = this.singleSelectFormGroup.getFormGroup();
    //     this.claimsFormGroup = this.addClaimsFormGroup.getFormGroup();
    //   }
    // });

    this.userSecurityService.getClaims(`${environment.identityServerURL}/Clients/3/ClaimGroups`)

    this.addFormGroup = this.addRoleFormGroup.getFormGroup();
    this.multiFormGroup = this.multiSelectFormGroup.getFormGroup();
    this.singleFormGroup = this.singleSelectFormGroup.getFormGroup();
    this.claimsFormGroup = this.addClaimsFormGroup.getFormGroup([]);
    this.multiFormGroup.get("options").valueChanges.subscribe(value => {
      this.claimsList = this.claimsList.concat(value.filter((item: any) => { return !Array.isArray(item) }));
      this.claimsList = this.claimsList.filter((item: any, index: number) => this.claimsList.indexOf(item) === index);
    });
    this.singleFormGroup.get("option").valueChanges.subscribe(value => {
      this.moduleClaims = value.clientClaims;
    });

    this.subscriptions.add(
      this.userSecurityService.addRole$.subscribe((data) => {
        this.saveUserClaims(data?.id);
      })
    );

    this.subscriptions.add(
      claims$.subscribe((data) => {
        console.log(data);
        this.moduleList = data;
      })
    );
  }

  async saveUserClaims(roleId: string) {
    if (roleId) {
      this.claimsFormGroup.value.claims.forEach((claim: AddClaim) => {
        const addClaim: AddClaim = { claimType: claim.claimType, claimValue: claim.claimValue, roleId: roleId };
        console.log(addClaim);
      });
    }
  }

  getFormControl(key: string): FormControl {
    return this.addFormGroup.controls[key] as FormControl;
  }

  getAddClaimForControl(key: string): FormArray {
    return this.claimsFormGroup.controls[key] as FormArray;
  }


  onSave(): void {
    if (this.addFormGroup.valid) {
      //Save Role and get RoleId
      this.claimsList.map((value: any) => {
        this.addClaimsFormGroup.addClaim({ claimType: value.type, claimValue: value.value, roleId: '' })
      });
      if (this.claimsFormGroup.valid) {
        this.userSecurityService.addRole(this.addFormGroup.value);
      }
    }
  }

  onCancel(): void {
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

