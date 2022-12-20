import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';
import { SharedModule } from '@root/shared/shared.module';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { GeneralAccountingComponent } from './general-accounting/general-accounting.component';
import { AddJournalComponent } from '../add-journal/components/add-journal.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { SearchComponent } from '../accounts/components/search/search.component';
import { AccountsComponent } from '../accounts/components/accounts/accounts.component';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyEditorComponent } from '../currency-editor/currency-editor.component';
import { MatDialogModule } from '@angular/material/dialog';
import { PrintJournalComponent } from '../print-journal/print-journal.component';
import { EditCurrencyChangeComponent } from '../edit-currency-change/edit-currency-change.component';

const routes: Route[] = [
  {
    path: ApplicationRoutes.Empty,
    component: GeneralAccountingComponent,
  },
  {
    path: ApplicationRoutes.AddJournal,
    component: AddJournalComponent,
  },
  {
    path: ApplicationRoutes.Accounts,
    component: AccountsComponent,
  },
  {
    path: ApplicationRoutes.CurrencyEditor,
    component: CurrencyEditorComponent,
  },
];

@NgModule({
  declarations: [
    GeneralAccountingComponent,
    AddJournalComponent,
    AccountsComponent,
    SearchComponent,
    CurrencyEditorComponent,
    PrintJournalComponent,
    EditCurrencyChangeComponent

  ],
  imports: [
    CommonModule,
    SharedModule,
    MatOptionModule,
    MatIconModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    RouterModule.forChild(routes)
  ]
})
export class GeneralAccountingModule { }
