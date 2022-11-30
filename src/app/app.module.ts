import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';
import { IconSvgModule } from './shared/utilities-modules/icon-svg.module';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslationService } from './shared/services/translation.service';

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
    SharedModule,
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
