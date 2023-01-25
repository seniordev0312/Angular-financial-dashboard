import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  // ViewChild,
} from '@angular/core';

import { FormControl } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { Router } from '@angular/router';
// import { BaseComponent } from '@root/shared/components/base-component/base-component';
// import { WidgetTableComponent } from '@root/shared/components/widget-table/widget-table.component';
// import { TableColumnFilterDataType } from '@root/shared/models/table/enum/table-column-filter-data-type.enum';
// import { TableColumn } from '@root/shared/models/table/table-column.model';
// import { TableConfiguration } from '@root/shared/models/table/table-configuration.model';
// import { TableRowAction } from '@root/shared/models/table/table-row-action.model';
// import { TableSettings } from '@root/shared/models/table/table-settings.model';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

@Component({
  selector: 'app-accounts-payable',
  templateUrl: './accounts-payable.component.html',
  styleUrls: ['./accounts-payable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountsPayableComponent implements OnInit {
  startDateFormControl = new FormControl();
  endDateFormControl = new FormControl();

  constructor(private layoutService: LayoutService) {}

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({
      crumbs: [
        {
          route: ApplicationRoutes.AccountsPayable,
          translationKey:
            'accounting-add-finance.accounts-payable.accounts-payable',
        },
      ],
    });
  }
}
