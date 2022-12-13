import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from "@angular/router";
import { authService } from "./auth.service";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private authService: authService) { }

    canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
        // console.log(route, state);
        this.authService
            .checkAuth()
            .subscribe(async (isAuthenticated) => {
                if (isAuthenticated.isAuthenticated) {
                    // getUserClaims
                    await this.authService.token.subscribe((_token: string) => {
                        console.log(_token);
                    });
                    // await this.authService.userData.subscribe((_userData: any) => {
                    //     // console.log(userData);
                    // });
                } else {
                    this.authService.doLogin().subscribe((result: any) => {
                        console.log(result);
                    })
                }
            }
            );
        return true;
    }


}