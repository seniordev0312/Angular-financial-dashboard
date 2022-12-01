import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EntityTemplate } from '@root/shared/models/entities/entity-template.model';

@Component({
  selector: 'app-entities-viewer',
  templateUrl: './entities-viewer.component.html',
  styleUrls: ['./entities-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesViewerComponent implements OnInit {
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
