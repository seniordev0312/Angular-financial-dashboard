import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';
import { environment } from 'src/environments/environment';
import { ApplicationRoutes } from './shared/settings/common.settings';


@NgModule({
    imports: [
        AuthModule.forRoot({
            config: {
                authority: environment.identityServerURL,
                redirectUrl: window.location.origin,
                postLogoutRedirectUri: 'http://localhost:4200',
                clientId: 'aperture-powerhouse',
                scope: 'openid profile roles email insurance_powerhouse address apertureidentity_api',
                responseType: 'code',
                silentRenew: true,
                useRefreshToken: true,
                tokenRefreshInSeconds: 20,
                logLevel: LogLevel.Debug,
                renewUserInfoAfterTokenRenew: true,
                renewTimeBeforeTokenExpiresInSeconds: 30,
                postLoginRoute: `/${ApplicationRoutes.Dashboard}`
            }
        })],
    exports: [AuthModule],
})
export class AuthConfigModule { }
