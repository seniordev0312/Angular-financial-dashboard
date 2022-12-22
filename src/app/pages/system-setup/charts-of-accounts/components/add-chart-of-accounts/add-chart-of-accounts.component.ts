import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { DialogMode } from '@root/shared/models/enums/dialog-mode.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AddChartOfAccountFormGroup } from '../../form-groups/add-chart-of-account-form-group.service';
import { ChartOfAccountsListService } from '../../services/chart-of-accounts-list.service';
import { accountDetails$, currenciesList$, accountTypes$ } from '../../store/chart-of-accounts.store';

@Component({
  selector: 'app-add-chart-of-accounts',
  templateUrl: './add-chart-of-accounts.component.html',
  styleUrls: ['./add-chart-of-accounts.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AddChartOfAccountsComponent extends BaseComponent implements OnInit {
  fg: FormGroup;
  mode: DialogMode = DialogMode.Add;
  currenciesList: BaseListItem[];
  parentAccountsList: BaseListItem[];
  accountTypesList: BaseListItem[] = [
    { id: 1, value: 'Capital' },
    { id: 2, value: 'Asset' },
    { id: 3, value: 'Liability' },
    { id: 4, value: 'Vat Supplier' },
    { id: 5, value: 'Bank And Cash' },
    { id: 6, value: 'Expense' },
    { id: 7, value: 'Revenue' },
    { id: 8, value: 'OffBalance' }
  ];
  isGroup = false;
  id: string;
  showIsGroup = false;
  canChangeParent = false;
  constructor(private addChartOfAccountFormGroup: AddChartOfAccountFormGroup,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private chartOfAccountsListService: ChartOfAccountsListService,
    private layoutService: LayoutService) { super(); }

  get isParentAccountDisabled(): boolean {
    return this.fg && this.fg.get('parentAccountTypeId').disabled;
  }

  ngOnInit(): void {
    this.chartOfAccountsListService.getCurrenciesList();
    this.chartOfAccountsListService.getAccountTypesList('d');

    this.subscriptions.add(this.activeRoute.paramMap.subscribe(params => {
      if (params.get('isGroup')) {
        this.isGroup = params.get('isGroup') === 'true';
      }
      if (params.get('id')) {
        this.id = params.get('id');
        this.mode = DialogMode.Edit;
        if (params.get('isGroup') === 'true') {
          this.chartOfAccountsListService.getAccountTypeDetails(this.id);
        }
        else {
          this.chartOfAccountsListService.getAccountDetails(params.get('id'));
          if (this.isGroup) {
            this.fg.get('parentAccountTypeId').disable();
            this.fg.get('parentAccountTypeId').removeValidators(Validators.required);
            this.fg.get('isNewGroup').removeValidators(Validators.required);
          }
        }
      }
      else {
        this.fg = this.addChartOfAccountFormGroup.getFormGroup();
      }
    }));


    this.subscriptions.add(this.fg?.get('isNewGroup').valueChanges.subscribe(data => {
      if (!data) {
        this.isGroup = false;
        this.fg.get('parentAccountTypeId').disable();
        this.fg.get('parentAccountTypeId').removeValidators(Validators.required);
      }
      else {
        this.isGroup = true;
        this.fg.get('parentAccountTypeId').enable();
        this.fg.get('parentAccountTypeId').addValidators(Validators.required);
      }
    }));

    this.subscriptions.add(currenciesList$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.currenciesList = data.map(e => ({ id: e.currencyId, value: e.name }));
      }
    }));

    this.subscriptions.add(accountDetails$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.fg = this.addChartOfAccountFormGroup.getFormGroup(data);
        this.fg.get('isNewGroup').removeValidators(Validators.required);
        if (data.accountTypeId) {
          this.isGroup = true;
        }
        if (this.isGroup) {
          this.fg.get('parentAccountTypeId').disable();
          this.fg.get('parentAccountTypeId').removeValidators(Validators.required);
        }
        this.cdr.detectChanges();
      }
    }));

    this.subscriptions.add(accountTypes$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.parentAccountsList = data;
        this.cdr.detectChanges();
      }
    }));

    this.subscriptions.add(this.activeRoute.queryParams.subscribe(params => {
      if (params.parentAccountTypeId) {
        this.showIsGroup = true;
        this.fg.patchValue({ parentAccountTypeId: Number(params.parentAccountTypeId) });
      }
      if (params.canChangeParent === 'false') {
        this.fg.get('parentAccountTypeId').disable();
        this.fg.get('parentAccountTypeId').removeValidators(Validators.required);
      }
      this.cdr.detectChanges();
    }));
  }

  onSave(): void {
    if (this.fg.valid) {
      const data = this.addChartOfAccountFormGroup.getValueFromFormGroup(this.fg);
      if (this.isCreateMode()) {
        if (this.isGroup) {
          this.chartOfAccountsListService.addAccountType(data);
        }
        else {
          this.chartOfAccountsListService.addAccount(data);
        }
      }
      else {
        if (this.isGroup) {
          this.chartOfAccountsListService.updateAccountType(data);
        }
        else {
          this.chartOfAccountsListService.updateAccount(data);
        }
      }
      this.fg.reset();
      this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.ChartOfAccounts}`]);
      this.layoutService.closeRightSideNav();
    }
  }


  onClose(): void {
    this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.ChartOfAccounts}`]);
    this.layoutService.closeRightSideNav();
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  isCreateMode() {
    return this.mode === DialogMode.Add;
  }

  isUpdateMode() {
    return this.mode === DialogMode.Edit;
  }

  onSearchParentAccount(data: string) {
    this.chartOfAccountsListService.getAccountTypesList(data);
  }
}
