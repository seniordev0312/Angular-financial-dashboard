import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationDropdown } from '@root/layout/models/navigation-dropdown';
import { NavigationLink } from '@root/layout/models/navigation-link';
import { SecurityCheckerService } from '@root/shared/services/security-checker.service';

@Component({
  selector: 'app-navigation-item',
  templateUrl: './navigation-item.component.html',
  styleUrls: ['./navigation-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationItemComponent {
  @Input() item: NavigationLink | NavigationDropdown;
  @Input() isSubItem = false;
  @Input() extended: boolean;

  constructor(private router: Router,
    private securityCheckerService: SecurityCheckerService) { }

  navigate(url: string, sidenavLink: string = null) {
    this.router.navigate([url, {
      outlets: {
        sidenav: sidenavLink
      },
    }]);
  }

  isLink(item: NavigationLink | NavigationDropdown): item is NavigationLink {
    return item.type === 'link';
  }

  isDropDown(item: NavigationLink | NavigationDropdown): item is NavigationDropdown {
    return item.type === 'dropdown';
  }

  doesChildrenHasPermission(item: NavigationDropdown): boolean {
    return item.subRouteItems.some(child => {
      return this.doesNavigationLinkHasPermission(child);
    });
  }

  doesNavigationLinkHasPermission(item: NavigationLink) {
    return this.securityCheckerService.doesUserHasPermission(item.permission);
  }
}
