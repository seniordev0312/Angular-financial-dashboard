import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EntitiesControlComponent } from './pages/entities-control/components/entities-control/entities-control.component';
import { EntitiesViewerComponent } from './pages/entities-management/components/entities-viewer/entities-viewer.component';
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
      this.dialog.open(EntitiesViewerComponent, {
        width: '90%',
        height: '90%'
      })
    }
    else if (event.key == 'F3') {
      this.dialog.open(EntitiesControlComponent, {
        width: '90%',
        height: '90%'
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
