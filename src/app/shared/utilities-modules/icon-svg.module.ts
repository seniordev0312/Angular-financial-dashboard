import { NgModule } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@NgModule({
    declarations: [],
    exports: [],
})
export class IconSvgModule {
    constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
        iconRegistry
            .addSvgIcon(
                /** Usage <mat-icon svgIcon="bed" color="primary"></mat-icon> **/
                'logo',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/logo.svg')
            ).addSvgIcon(
                'notification',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/notification.svg')
            ).addSvgIcon(
                'menu',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/menu.svg')
            ).addSvgIcon(
                'close',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/close.svg')
            ).addSvgIcon(
                'small-down',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/small-down.svg')
            ).addSvgIcon(
                'user-profile',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/user-profile.svg')
            ).addSvgIcon(
                'language',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/language.svg')
            ).addSvgIcon(
                'logout',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/logout.svg')
            ).addSvgIcon(
                'search',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/search.svg')
            ).addSvgIcon(
                'treaty',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/treaty.svg')
            ).addSvgIcon(
                'system-setup',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/system-setup.svg')
            ).addSvgIcon(
                'settings',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/settings.svg')
            ).addSvgIcon(
                'entity-management',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/entity-management.svg')
            ).addSvgIcon(
                'search-gray',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/search-gray.svg')
            ).addSvgIcon(
                'product-management',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/product-management.svg')
            ).addSvgIcon(
                'activityLog',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/activityLog.svg')
            ).addSvgIcon(
                'correspondence',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/correspondence.svg')
            ).addSvgIcon(
                'customer-service',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/customer-service.svg')
            ).addSvgIcon(
                'insurance-underwriting',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/insurance-underwriting.svg')
            ).addSvgIcon(
                'accounting-and-finance',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/accounting-and-finance.svg')
            ).addSvgIcon(
                'dashboard',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/dashboard.svg')
            ).addSvgIcon(
                'microphone',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/microphone.svg')
            ).addSvgIcon(
                'attach',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/attach.svg')
            ).addSvgIcon(
                'call-out',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/call-out.svg')
            ).addSvgIcon(
                'gallery',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/gallery.svg')
            ).addSvgIcon(
                'human-resources',
                sanitizer.bypassSecurityTrustResourceUrl('assets/images/svg-icons/human-resources.svg')
            );
    }
}
