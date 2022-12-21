import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { AddReferenceTablesFormGroup } from '../../services/add-reference-tables-form-group';
import { ReferenceTablesService } from '../../services/reference-tables.service';

@Component({
  selector: 'app-add-reference-tables',
  templateUrl: './add-reference-tables.component.html',
  styleUrls: ['./add-reference-tables.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddReferenceTablesComponent extends BaseComponent implements OnInit {

  fg: FormGroup;
  ReferenceKeyList: BaseListItem[] = [
    {
      id: '1',
      value: 'Language'
    },
    {
      id: '2',
      value: 'Country'
    },
    {
      id: '3',
      value: 'Currency'
    },
    {
      id: '4',
      value: 'AccountingStyle'
    },
  ]
  constructor(
    private layoutService: LayoutService,
    private router: Router,
    private referenceTablesService: ReferenceTablesService,
    private addReferenceTablesFormGroup: AddReferenceTablesFormGroup,
    private activeRoute: ActivatedRoute
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.activeRoute.queryParams.subscribe(params => {
      if (params.id) {
      } else {
        this.fg = this.addReferenceTablesFormGroup.getFormGroup();
      }
    }));
  }

  onSave(): void {
    if (this.fg.valid) {
      const key: any = this.ReferenceKeyList.filter((e: BaseListItem) => e.id === this.fg.controls['key'].value)[0].value;
      console.log(key);
      // this.fg.controls['key'].value = key

      this.referenceTablesService.addReferenceTables({
        code: this.fg.controls['code'].value,
        key: key,
        value: this.fg.controls['value'].value,
      });
      this.router.navigate([`${ApplicationRoutes.SystemSetup}/${ApplicationRoutes.ReferenceTables}`, {
        outlets: {
          sidenav: ApplicationRoutes.Add
        },
      }], { skipLocationChange: true });
      this.layoutService.closeRightSideNav();
    }

  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  onCancel(): void {
    this.layoutService.closeRightSideNav();
  }

}
