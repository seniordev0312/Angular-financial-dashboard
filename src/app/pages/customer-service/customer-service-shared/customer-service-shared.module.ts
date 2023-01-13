import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicySortComponent } from './components/policy-sort/policy-sort.component';
import { PolicyCardComponent } from './components/policy-card/policy-card.component';
import { PolicyStatusComponent } from './components/policy-status/policy-status.component';
import { PolicyFilterComponent } from './components/policy-filter/policy-filter.component';
import { SharedModule } from '@root/shared/shared.module';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    PolicySortComponent,
    PolicyCardComponent,
    PolicyStatusComponent,
    PolicyFilterComponent,
  ],
  imports: [CommonModule, SharedModule, MatIconModule],
  exports: [
    PolicySortComponent,
    PolicyCardComponent,
    PolicyStatusComponent,
    PolicyFilterComponent,
  ],
})
export class CustomerServiceSharedModule {}
