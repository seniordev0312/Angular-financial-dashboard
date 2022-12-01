import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { card } from '@root/shared/models/card/card.model';

@Component({
  selector: 'app-entities-management',
  templateUrl: './entities-management.component.html',
  styleUrls: ['./entities-management.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitiesManagementComponent implements OnInit {
  cards: card[] = [
    {
      title: 'Entity References Setup',
      items: [
        {
          title: 'Manage Entity Section Templates',
        },
        {
          title: 'Manage Entity Relationship Types',
        },
        {
          title: 'Manage KYC Document Types',
        }
      ],
      backgroundColor: '#186AA5'
    },
    {
      title: 'Entity Sources Setup',
      items: [
        {
          title: 'Manage Entity Sources & Mapping',
        },
      ],
      backgroundColor: '#469CD9'
    },
    {
      title: 'Entity Management',
      items: [
        {
          title: 'Manage Entities',
        },
      ],
      backgroundColor: '#7BC8FF'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
