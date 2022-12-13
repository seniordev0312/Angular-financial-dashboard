import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';

import { AuthService } from '../auth.service';

@Directive({
    selector: "[accessControl]",
})
export class AccessControlDirective implements OnInit {
    @Input("accessControl") accessControl: string;
    @Input("moduleType") moduleType: string;
    @Input("accessType") accessType: string;
    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private auth: AuthService) { }

    ngOnInit() {
        console.log(this.accessType, this.moduleType);
        this.checkAccess();
    }
    checkAccess() {
        const accessControls: any = this.auth.userData;
        console.log(accessControls);
        if (true) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
        // const module: any = accessControls.find(access => access.module_name === this.moduleType);
        // this.elementRef.nativeElement.style.display = module[this.accessType] ? "block" : "none";
    }
}