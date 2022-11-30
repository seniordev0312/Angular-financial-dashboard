import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesControlComponent } from './components/entities-control/entities-control.component';
import { AddEntityComponent } from './components/add-entity/add-entity.component';
import { SharedModule } from '@root/shared/shared.module';



@NgModule({
  declarations: [
    EntitiesControlComponent,
    AddEntityComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
  ]
})
export class EntitiesControlModule { }
