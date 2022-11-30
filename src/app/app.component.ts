import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EntitiesControlComponent } from './pages/entities-control/components/entities-control/entities-control.component';
import { EntitiesManagementComponent } from './pages/entities-management/components/entities-management/entities-management.component';
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
    if (event.key == 'F2') {
      this.dialog.open(EntitiesManagementComponent, {
        width: '100%',
        height: '100%'
      })
    }
    else if (event.key == 'F3') {
      this.dialog.open(EntitiesControlComponent, {
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
