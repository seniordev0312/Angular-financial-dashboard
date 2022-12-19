import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Permission } from '@root/shared/models/enums/permissions.enum';
import { LayoutService } from '@root/shared/services/layout.service';
import { ApplicationRoutes } from '@root/shared/settings/common.settings';

import { card } from '../../../../shared/models/card/card.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {

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
          route: ApplicationRoutes.InsuranceRenewals,
          permission: Permission.CanAccessInsuranceRenewals
        },
        {
          title: 'Customer Service',
          number: 21,
          route: ApplicationRoutes.CustomerService,
          permission: Permission.CanAccessCustomerService
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
          route: ApplicationRoutes.InsuranceRenewals,
          permission: Permission.CanAccessInsuranceRenewals
        },
        {
          title: 'Customer Service',
          number: 21,
          route: ApplicationRoutes.CustomerService,
          permission: Permission.CanAccessCustomerService
        },
        {
          title: 'Insurance Renewals',
          number: 4,
          route: ApplicationRoutes.InsuranceRenewals,
          permission: Permission.CanAccessInsuranceRenewals
        },
        {
          title: 'Customer Service',
          number: 21,
          route: ApplicationRoutes.CustomerService,
          permission: Permission.CanAccessCustomerService
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
          route: ApplicationRoutes.InsuranceRenewals,
          permission: Permission.CanAccessInsuranceRenewals
        },
        {
          title: 'Customer Service',
          number: 21,
          route: ApplicationRoutes.CustomerService,
          permission: Permission.CanAccessCustomerService
        }
      ],
      backgroundColor: '#7BC8FF'
    }
  ]
  constructor(
    private router: Router,
    private layoutService: LayoutService) {

  }

  ngOnDestroy(): void {
    this.layoutService.closeRightSideNav();
  }

  ngOnInit(): void {
    this.layoutService.updateBreadCrumbsRouter({});
    this.router.navigate([`${ApplicationRoutes.Dashboard}`, {
      outlets: {
        sidenav: ApplicationRoutes.Email
      },
    }], { skipLocationChange: true });
    this.layoutService.openRightSideNav();
    this.layoutService.changeRightSideNavMode('side');
  }
}
