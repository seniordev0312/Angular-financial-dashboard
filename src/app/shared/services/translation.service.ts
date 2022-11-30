/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Lang } from '@root/shared/models/enums/languages.enum';
import { LayoutService } from '@root/shared/services/layout.service';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class TranslationService {

    constructor(private translateService: TranslateService,
        private layoutService: LayoutService,
        @Inject(DOCUMENT) private document: Document,
    ) { }

    use(value: Lang): void {
        this.translateService.use(value);
    }

    init(): void {
        const defaultLanguage: Lang = (localStorage.getItem('language') as Lang) || Lang.English;
        this.use(defaultLanguage);
    }

    getCurrentLang(): Lang {
        return this.translateService.currentLang as Lang;
    }

    translate(key: string, interpolateParams?: {}): Observable<string> {
        return this.translateService.stream(key, interpolateParams);
    }

    instantTranslate(key: string) {
        return this.translateService.instant(key);
    }

    currentLang(): Observable<Lang> {
        return this.translateService.onLangChange.pipe(
            startWith({ lang: this.getCurrentLang() }),
            map((res) => res.lang as Lang)
        );
    }

    get(key: string, interpolateParams?: {}): Observable<any> {
        return this.translateService.get(key, interpolateParams);
    }

    setDefaultLanguage() {
        let defaultLanguage: Lang = localStorage.getItem('language') as Lang;
        if (defaultLanguage === Lang.Arabic) {
            this.layoutService.isRTLDirection$.next(true);
        }
        else if (defaultLanguage === null) {
            defaultLanguage = Lang.English;
            localStorage.setItem('language', defaultLanguage);
            this.layoutService.isRTLDirection$.next(false);
        }
        this.document.body.dir = defaultLanguage === Lang.Arabic ? 'rtl' : 'ltr';
        this.use(defaultLanguage);
    }
}
