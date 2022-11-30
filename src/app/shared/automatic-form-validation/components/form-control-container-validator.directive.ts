import { Directive, OnInit, OnDestroy, Optional, Host, ComponentRef, ViewContainerRef, Input } from '@angular/core';
import { ControlContainer } from '@angular/forms';
import { ValidationErrorMappingService } from '@root/shared/automatic-form-validation/services/validation-message-generator.service';
import { Subject, merge, EMPTY } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ValidationMessageComponent } from '@root/shared/automatic-form-validation/components/validation-error-message.component';
import { ValidatorFormDirective } from '@root/shared/automatic-form-validation/components/validator-parent-form.directive';
import { FormFieldWrapperDirective } from '@root/shared/automatic-form-validation/components/form-control-wrapper.directive';
import { SubmissionValidationEventService } from '@root/shared/automatic-form-validation/services/validator-submission-event.service';
import { ErrorMessageContainerDirective } from '@root/shared/automatic-form-validation/components/error-message-container.directive';
import { ErrorDynamicGeneratorService } from '@root/shared/automatic-form-validation/services/dynamic-error-message-generator.service';
@Directive({
    selector: '[formGroupName], [formGroup], [appformGroup], [formArrayName], [formArray], [appformArray]',
    providers: [ValidationErrorMappingService, ErrorDynamicGeneratorService],
})

export class FormControlContainerValidatorDirective implements OnInit, OnDestroy {
    @Input() errorContainer: ErrorMessageContainerDirective;
    @Input() showValidation = true;
    destroy$ = new Subject();
    ref: ComponentRef<ValidationMessageComponent> = null;
    vcr: ViewContainerRef;
    constructor(private control: ControlContainer,
        @Optional() @Host() private form: ValidatorFormDirective,
        private viewContainerRef: ViewContainerRef,
        private submissionValidation: SubmissionValidationEventService,
        @Optional() @Host() private fieldWrapperVcr: FormFieldWrapperDirective,
        @Optional() @Host() private errorMessageContainerDirective: ErrorMessageContainerDirective,
        private errorDynamicGeneratorService: ErrorDynamicGeneratorService,
    ) {
        if (errorMessageContainerDirective) {
            this.vcr = this.errorMessageContainerDirective.getVcr();
        }
        else if (fieldWrapperVcr) {
            this.vcr = this.fieldWrapperVcr.getVcr();
        }
        else {
            this.vcr = this.viewContainerRef;
        }
    }

    ngOnInit() {
        if (this.showValidation) {
            if (this.errorContainer) {
                this.vcr = this.errorContainer.getVcr();
            }
            const submit$ = this.form?.submit$ || EMPTY;
            merge(
                submit$,
                this.control.valueChanges,
                this.submissionValidation.submitted$
            ).pipe(
                takeUntil(this.destroy$)
            ).subscribe(() => {
                const controlErrors = this.control.errors;
                this.errorDynamicGeneratorService.onErrorOccurred(controlErrors, this.control, this.vcr);
            });
        }
    }

    ngOnDestroy() {
        this.destroy$.next(null);
        this.ref?.destroy();
    }
}
