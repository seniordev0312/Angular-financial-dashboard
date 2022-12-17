/* eslint-disable @typescript-eslint/member-ordering */
import { Directive, TemplateRef, ViewContainerRef, ChangeDetectorRef, Input, OnInit } from '@angular/core';
import { SecurityCheckerService } from '@root/shared/services/security-checker.service';
import { Permission } from '../models/enums/permissions.enum';
@Directive({
    selector: '[appCanAccessFeature]'
})
export class CanAccessFeatureDirective implements OnInit {
    private permissionInput: Permission;
    @Input()
    set appCanAccessFeature(permission: Permission) {
        if (permission?.length > 0) {
            this.permissionInput = permission;
        }
    }

    constructor(
        private securityCheckService: SecurityCheckerService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef,
        private cdr: ChangeDetectorRef,
    ) { }

    ngOnInit() {
        if (this.permissionInput && this.permissionInput.length > 0) {
            this.showIfCanUser(this.permissionInput);
        }
    }

    showIfCanUser(permission: Permission) {
        this.viewContainer.clear();
        if (this.securityCheckService.doesUserHasPermission(permission)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
            this.cdr.markForCheck();
        }
    }
}
