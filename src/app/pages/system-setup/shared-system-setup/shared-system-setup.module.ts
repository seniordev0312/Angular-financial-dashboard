import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@root/shared/shared.module';
import { SystemSetupComponent } from './system-setup/system-setup.component';



@NgModule({
  declarations: [SystemSetupComponent],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatIconModule,
    SharedModule
  ],
  exports: [SystemSetupComponent]
})
export class SharedSystemSetupModule { }
