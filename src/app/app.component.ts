import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {
  EntitiesControlComponent,
} from './pages/entities/entities-control/components/entities-control/entities-control.component';
import {
  EntitiesViewerComponent,
} from './pages/entities/entities-viewer/components/entities-viewer/entities-viewer.component';
import { BaseComponent } from './shared/components/base-component/base-component';
import { TranslationService } from './shared/services/translation.service';
import { ApplicationRoutes } from './shared/settings/common.settings';

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
    private router: Router,
    translationService: TranslationService,
  ) {
    super();
    translationService.setDefaultLanguage();
    console.log(environment)
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationEnd && e.url === '/') {
        this.router.navigate([`${ApplicationRoutes.Dashboard}`]);
      }
    });
  }
}
