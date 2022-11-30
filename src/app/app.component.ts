import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  EntitiesManagementComponent,
} from './pages/entities-management/components/entities-management/entities-management.component';
import { TranslationService } from './shared/services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'Insurance Power House';
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode == 113) {
      this.dialog.open(EntitiesManagementComponent, {
        width: '100%',
        height: '100%'
      })
    }
  }

  constructor(
    private dialog: MatDialog,
    translationService: TranslationService
  ) {
    translationService.setDefaultLanguage();
  }
}
