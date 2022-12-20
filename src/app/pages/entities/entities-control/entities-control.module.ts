import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesControlComponent } from './components/entities-control/entities-control.component';
import { AddEntityComponent } from './components/add-entity/add-entity.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CreateEntityChecksComponent } from './components/create-entity-checks/create-entity-checks.component';
import { EntityTypeComponent } from './components/entity-type/entity-type.component';
import { SharedModule } from '@root/shared/shared.module';
import { NewEntityMatchPercentageComponent } from './components/new-entity-match-percentage/new-entity-match-percentage.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { EntitySectionComponent } from './components/entity-section/entity-section.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
  declarations: [
    EntitiesControlComponent,
    AddEntityComponent,
    CreateEntityChecksComponent,
    EntityTypeComponent,
    NewEntityMatchPercentageComponent,
    EntitySectionComponent
  ],
  imports: [
    CommonModule,
    CdkAccordionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    SharedModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class EntitiesControlModule { }
