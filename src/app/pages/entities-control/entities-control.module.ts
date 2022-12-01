import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EntitiesControlComponent } from './components/entities-control/entities-control.component';
import { AddEntityComponent } from './components/add-entity/add-entity.component';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CreateEntityChecksComponent } from './components/create-entity-checks/create-entity-checks.component';
import { EntityTypeComponent } from './components/entity-type/entity-type.component';
import { EntityBasicInformationComponent } from './components/entity-basic-information/entity-basic-information.component';
import { EntityBankAccountInformationComponent } from './components/entity-bank-account-information/entity-bank-account-information.component';
import { EntityKycInformationComponent } from './components/entity-kyc-information/entity-kyc-information.component';
import { EntityAddressInformationComponent } from './components/entity-address-information/entity-address-information.component';
import { SharedModule } from '@root/shared/shared.module';
import { NewEntityMatchPercentageComponent } from './components/new-entity-match-percentage/new-entity-match-percentage.component';



@NgModule({
  declarations: [
    EntitiesControlComponent,
    AddEntityComponent,
    CreateEntityChecksComponent,
    EntityTypeComponent,
    EntityBasicInformationComponent,
    EntityBankAccountInformationComponent,
    EntityKycInformationComponent,
    EntityAddressInformationComponent,
    NewEntityMatchPercentageComponent
  ],
  imports: [
    CommonModule,
    CdkAccordionModule,
    SharedModule
  ]
})
export class EntitiesControlModule { }
