import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { GeneralAccountingService } from '../../../general-accounting/general-accounting.service';
import { AccountModel } from '../../model/accounts.model';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  @ViewChild('select', { static: true }) select: any;
  showMenu = true;
  @Output() selectAccount: EventEmitter<any> = new EventEmitter();

  accounts: AccountModel[] = []
  localAccount: AccountModel;
  constructor(
    private generalAccountingService: GeneralAccountingService,
  ) { }


  ngOnInit() {
    this.localAccount = {
      name: '',
      accountId: -1,
      code: '',
      accountTypeId: -1,
      currencyId: -1,
      ein: -1
    }
    this.select.openedChange.subscribe((isOpen: any) => {
      if (isOpen) {
        this.showMenu = false;
      } else {
        this.showMenu = true;
      }
    })
  }
  onTextChange(event: any) {
    if (event.target.value.length !== 0)
      this.searchApplication(event.target.value);
  }

  selectionChange(accent: AccountModel) {
    this.showMenu = true;
    this.localAccount = accent;
    this.selectAccount.emit(accent);
  }

  ///
  async searchApplication(query: string) {
    const result = await this.generalAccountingService.searchAccounts(query);
    result.subscribe({
      error: (_error: any) => {
      },
      next: async (data: any) => {
        if (data.length !== 0) {
          this.showMenu = false;
          this.select.open();
        } else {
          this.select.close();
          this.showMenu = true;
        }
        this.accounts = data;
      },
      complete: async () => {
      },
    });
  }
}
