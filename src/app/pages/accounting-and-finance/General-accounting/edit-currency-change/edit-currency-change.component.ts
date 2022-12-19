import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GeneralAccountingService } from '../general-accounting/general-accounting.service';
import { CurrencyRateModel } from '../general-accounting/model/currency-rate.model';

@Component({
  selector: 'app-edit-currency-change',
  templateUrl: './edit-currency-change.component.html',
  styleUrls: ['./edit-currency-change.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditCurrencyChangeComponent implements OnInit {

  newCurrencyChange = 0;
  constructor(@Inject(MAT_DIALOG_DATA) public data: CurrencyRateModel,
    private generalAccountingService: GeneralAccountingService,
    public dialogRef: MatDialogRef<EditCurrencyChangeComponent>
  ) { }
  ngOnInit(): void {
    console.log(this.data)
  }

  onTextChange(event: any) {
    this.newCurrencyChange = event.target.value;
  }
  async update() {
    if (this.newCurrencyChange !== 0) {
      console.log("data", this.newCurrencyChange)
      const result = await this.generalAccountingService.addCurrencyRate(
        this.newCurrencyChange,
        this.data,
      );
      result.subscribe({
        error: (_error: any) => {
        },
        next: async (data: any) => {
          console.log("data", this.newCurrencyChange)
          console.log(data)
          this.dialogRef.close();
        },
        complete: async () => {
        },
      });
    }

  }
}
