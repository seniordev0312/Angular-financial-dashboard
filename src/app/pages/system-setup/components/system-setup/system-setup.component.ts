import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavListItem } from '@root/shared/models/nav-list-item.model';
import { systemSetupNavigationList } from '../../statics/system-setup-navigations-list';

@Component({
  selector: 'app-system-setup',
  templateUrl: './system-setup.component.html',
  styleUrls: ['./system-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemSetupComponent {

  navList = systemSetupNavigationList;
  constructor(private route: Router) { }


  onItemClick(navListItem: NavListItem) {
    this.route.navigate([`system-setup/${navListItem.route}`]);
  }

}
