import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-invoice',
  templateUrl: './vendor-invoice.component.html',
  styleUrls: ['./vendor-invoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VendorInvoiceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
