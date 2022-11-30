import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { TranslationService } from './shared/services/translation.service';
import { IconSvgModule } from './shared/utilities-modules/icon-svg.module';

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
  ],
  providers: [TranslationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
