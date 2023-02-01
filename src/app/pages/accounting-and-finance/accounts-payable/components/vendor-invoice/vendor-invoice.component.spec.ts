import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorInvoiceComponent } from './vendor-invoice.component';

describe('VendorInvoiceComponent', () => {
  let component: VendorInvoiceComponent;
  let fixture: ComponentFixture<VendorInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VendorInvoiceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VendorInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
