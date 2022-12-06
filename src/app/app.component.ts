import { ChangeDetectionStrategy, Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { authService } from './auth/auth.service';
import { EntitiesControlComponent } from './pages/entities/entities-control/components/entities-control/entities-control.component';
import { EntitiesViewerComponent } from './pages/entities/entities-viewer/components/entities-viewer/entities-viewer.component';
import { TranslationService } from './shared/services/translation.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
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
    translationService: TranslationService,
    private authService: authService
  ) {
    translationService.setDefaultLanguage();
  }

  ngOnInit() {
    this.authService
      .checkAuth()
      .subscribe((isAuthenticated) =>
        console.log('app authenticated', isAuthenticated)
      );
  }

}
