import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { SecurityCheckerService } from '@root/shared/services/security-checker.service';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class DropdownComponent implements OnInit {

  list: any[] = [{
    label: 'Set Profile',
    icon: 'user-profile',
    value: 'SetProfile ',
  }, {
    label: 'Set Language',
    icon: 'language',
    value: 'SetLanguage',
  }, {
    label: 'Sign out',
    icon: 'logout',
    value: 'SignOut',
  }];
  name: string;

  constructor(private oidcSecurityService: OidcSecurityService,
    private cdr: ChangeDetectorRef,
    private securityCheckerService: SecurityCheckerService) { }

  ngOnInit(): void {
    this.securityCheckerService.userClaims$.subscribe(data => {
      this.name = data?.name;
      this.cdr.detectChanges();
    })
  }

  onChange(event: string): void {
    if (event === 'SignOut') {
      this.onLogout();
    }
  }

  onLogout() {
    this.oidcSecurityService.logoff();
  }
}
