import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavListItem } from '@root/shared/models/nav-list-item.model';
import { systemSetupNavigationList } from '../../statics/system-setup-navigation-list';
import { SystemSetupService } from '../services/system-setup.service';

@Component({
  selector: 'app-system-setup',
  templateUrl: './system-setup.component.html',
  styleUrls: ['./system-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemSetupComponent implements OnInit {

  navList = systemSetupNavigationList;
  constructor(
    private route: Router,
    private systemSetupService: SystemSetupService
  ) { }
  onItemClick(navListItem: NavListItem) {
    this.route.navigate([`system-setup/${navListItem.route}`]);
  }

  ngOnInit(): void {
    this.systemSetupService.getDefaultLanguages();
    this.systemSetupService.getAccountingStyle();
    this.systemSetupService.getDefaultCurrency();
    this.systemSetupService.getCountries();
  }
}