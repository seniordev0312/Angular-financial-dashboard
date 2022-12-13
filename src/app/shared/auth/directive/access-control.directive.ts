import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthService } from '../auth.service';

@Directive({
    selector: "[accessControl]",
})
export class AccessControlDirective implements OnInit {
    @Input("accessControl") accessControl: any;
    @Input("moduleType") moduleType: string;
    @Input("accessType") accessType: string;


    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private auth: AuthService) { }

    ngOnInit() {
        this.checkAccess();
    }
    checkAccess() {
        this.auth.userData.subscribe((data: any) => {
            console.log(this.moduleType);

            if (
                data.userData[this.accessControl.moduleType].includes(this.accessControl.accessType)
                || data.userData[this.accessControl.moduleType] === this.accessControl.accessType
            ) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainer.clear();
            }
        });
    }
}