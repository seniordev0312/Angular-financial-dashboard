import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  EntitiesControlComponent,
} from './pages/entities/entities-control/components/entities-control/entities-control.component';
import {
  EntitiesViewerComponent,
} from './pages/entities/entities-viewer/components/entities-viewer/entities-viewer.component';
import { BaseComponent } from './shared/components/base-component/base-component';
import { AuthenticationService } from './shared/services/auth.service';
import { SecurityCheckerService } from './shared/services/security-checker.service';
import { TranslationService } from './shared/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent extends BaseComponent {
  title = 'Insurance Power House';
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key == 'F3') {
      this.dialog.open(EntitiesViewerComponent, {
        width: '90%',
        height: '90%'
      })
    }
    else if (event.key == 'F2') {
      this.dialog.open(EntitiesControlComponent, {
        width: '90%',
        height: '90%'
      })
    }
  }

  constructor(
    private dialog: MatDialog,
    translationService: TranslationService,
    public authenticationService: AuthenticationService,
    private securityCheckerService: SecurityCheckerService
  ) {
    super();
    translationService.setDefaultLanguage();
    this.subscriptions.add(this.authenticationService.userData$.subscribe((userDataResult) => {
      if (userDataResult?.userData) {
        this.securityCheckerService.setUserClaims(userDataResult?.userData);
      }
    }));
  }
}
