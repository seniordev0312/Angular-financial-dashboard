import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Actions } from '@ngneat/effects-ng';
import { devTools } from '@ngneat/elf-devtools';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { AuthConfigModule } from './shared/auth/auth-config.module';
import { AuthenticationInterceptor } from './shared/interceptors/authentication.interceptor';
import { TranslationService } from './shared/services/translation.service';
import { IconSvgModule } from './shared/utilities-modules/icon-svg.module';

export function initElfDevTools(actions: Actions) {
  return () => {
    devTools({
      name: 'Insurance Power House',
      actionsDispatcher: actions,
    });
  };
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    IconSvgModule,
    AppRoutingModule,
    MatDialogModule,
    LayoutModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (client: HttpClient) =>
          new TranslateHttpLoader(client, 'assets/i18n/', '.json'),
        deps: [HttpClient],
      },
    }),
    AuthConfigModule
  ],
  providers: [
    TranslationService,
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initElfDevTools,
      deps: [Actions],
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
