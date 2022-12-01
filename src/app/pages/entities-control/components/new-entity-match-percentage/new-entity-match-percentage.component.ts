import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EntityTemplatePercentage } from '@root/shared/models/entities/entity-template-percentage.model';
import { EntityTemplate } from '@root/shared/models/entities/entity-template.model';

@Component({
  selector: 'app-new-entity-match-percentage',
  templateUrl: './new-entity-match-percentage.component.html',
  styleUrls: ['./new-entity-match-percentage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewEntityMatchPercentageComponent implements OnInit {

  entityTemplatePercentage: EntityTemplatePercentage = {
    address: 100,
    city: 50,
    country: 40,
    dateOfBirth: 20,
    educationLevel: 10,
    einNumber: 40,
    firstName: 90,
    firstNameLL: 99,
    gender: 98,
    lastName: 89,
    lastNameLL: 78,
    nationality: 98,
    profession: 9,
    state: 100
  };
  entityTemplate: EntityTemplate = {
    address: 'Lebanon',
    city: 'Lebanon',
    country: 'Lebanon',
    dateOfBirth: '24/11/1998',
    educationLevel: 'Master',
    einNumber: '0909',
    firstName: 'tamara',
    firstNameLL: 'jkjkjkjkj',
    gender: 'Female',
    lastName: 'jammoul',
    lastNameLL: 'ham,m',
    nationality: 'Syrian',
    profession: 'nmmnm',
    state: 'lebanon'
  };
  constructor() { }

  ngOnInit(): void {
  }



}
