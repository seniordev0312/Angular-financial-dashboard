import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesControlComponent } from './components/entities-control/entities-control.component';
import { AddEntityComponent } from './components/add-entity/add-entity.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CreateEntityChecksComponent } from './components/create-entity-checks/create-entity-checks.component';
import { SharedModule } from '@root/shared/shared.module';
import { NewEntityMatchPercentageComponent } from './components/new-entity-match-percentage/new-entity-match-percentage.component';



@NgModule({
  declarations: [
    EntitiesControlComponent,
    AddEntityComponent,
    CreateEntityChecksComponent,
    NewEntityMatchPercentageComponent
  ],
  imports: [
    CommonModule,
    CdkAccordionModule,
    SharedModule
  ]
})
export class EntitiesControlModule { }
