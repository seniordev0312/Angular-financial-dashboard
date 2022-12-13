import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-service-left-side-bar',
  templateUrl: './left-side-bar.component.html',
  styleUrls: ['./left-side-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftSideBarComponent implements OnInit {

  items: any[] = [
    'Motor Underwriting Department', 
    'Medical Underwriting Department', 
    'Life Underwriting Department', 
    'General Underwriting Department',
    'Sales Department',
    'Customer Service',
    'Accounting Department',
    'Payables Department',
    'Receivables Department',
  ]

  constructor() { }

  ngOnInit(): void {
  }
}
