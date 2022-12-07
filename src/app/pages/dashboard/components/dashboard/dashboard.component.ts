import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LayoutService } from '@root/shared/services/layout.service';

import { card } from '../../../../shared/models/card/card.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {

  cards: card[] = [
    {
      employees: [
        {
          photoURL: '../../../../../assets//images/profile.svg',
        },
        {
          photoURL: '../../../../../assets//images/profile.svg',
        },
        {
          photoURL: '../../../../../assets//images/profile.svg',
        },
        {
          photoURL: '../../../../../assets//images/profile.svg',
        },
      ],
      title: 'Customer Service',
      items: [
        {
          title: 'Insurance Renewals',
          number: 4,
          route: ''
        },
        {
          title: 'Customer Service',
          number: 21,
          route: ''
        }
      ],
      backgroundColor: '#186AA5'
    },
    {
      employees: [
        {
          photoURL: '../../../../../assets//images/profile.svg',
        },
        {
          photoURL: '../../../../../assets//images/profile.svg',
        },
        {
          photoURL: '../../../../../assets//images/profile.svg',
        },
        {
          photoURL: '../../../../../assets//images/profile.svg',
        },
      ],
      title: 'Insurance Underwriting',
      items: [
        {
          title: 'Insurance Renewals',
          number: 4,
          route: ''
        },
        {
          title: 'Customer Service',
          number: 21,
          route: ''
        },
        {
          title: 'Insurance Renewals',
          number: 4,
          route: ''
        },
        {
          title: 'Customer Service',
          number: 21,
          route: ''
        }
      ],
      backgroundColor: '#469CD9'
    },
    {
      employees: [
        {
          photoURL: '../../../../../assets//images/profile.svg',
        },
        {
          photoURL: '../../../../../assets//images/profile.svg',
        },
        {
          photoURL: '../../../../../assets//images/profile.svg',
        },
        {
          photoURL: '../../../../../assets//images/profile.svg',
        },
      ],
      title: 'Accounting & Finance',
      items: [
        {
          title: 'Insurance Renewals',
          number: 4,
          route: ''
        },
        {
          title: 'Customer Service',
          number: 21,
          route: ''
        }
      ],
      backgroundColor: '#7BC8FF'
    }
  ]
  constructor(private layoutService: LayoutService) {

  }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({})
  }
}
