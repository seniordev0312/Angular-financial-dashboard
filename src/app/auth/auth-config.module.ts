import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            authority: 'https://dev.identity.sts.aperatureuk.com',
            redirectUrl: window.location.origin,
            postLogoutRedirectUri: window.location.origin,
            clientId: 'aperture-powerhouse',
            scope: 'openid profile roles email address entity_management_api identifyme_api',
            responseType: 'code',
            silentRenew: true,
            useRefreshToken: true,
            renewTimeBeforeTokenExpiresInSeconds: 30,
        }
    })],
    exports: [AuthModule],
})
export class AuthConfigModule { }
