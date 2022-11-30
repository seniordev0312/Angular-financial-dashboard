import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidationMessageComponent } from '@root/shared/automatic-form-validation/components/validation-error-message.component';
import { ValidatorFormDirective } from '@root/shared/automatic-form-validation/components/validator-parent-form.directive';
import { FormControlValidatorDirective } from '@root/shared/automatic-form-validation/components/form-control-validator.directive';
import { FormControlContainerValidatorDirective } from '@root/shared/automatic-form-validation/components/form-control-container-validator.directive';
import { FormFieldWrapperDirective } from '@root/shared/automatic-form-validation/components/form-control-wrapper.directive';
import { ErrorMessageContainerDirective } from '@root/shared/automatic-form-validation/components/error-message-container.directive';
import { SubmissionValidationTriggerDirective } from '@root/shared/automatic-form-validation/components/submission-validation-trigger.directive';
import { SubmissionValidationEventService } from '@root/shared/automatic-form-validation/services/validator-submission-event.service';
import { ValidateOnBlurDirective } from '@root/shared/automatic-form-validation/components/validate-on-blue.directive';
import { MatFormFieldModule } from '@angular/material/form-field';

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule
    ],
    entryComponents: [ValidationMessageComponent],
    declarations: [
        ValidationMessageComponent,
        ValidatorFormDirective,
        FormControlValidatorDirective,
        FormControlContainerValidatorDirective,
        FormFieldWrapperDirective,
        ErrorMessageContainerDirective,
        SubmissionValidationTriggerDirective,
        ValidateOnBlurDirective
    ],
    exports: [
        ValidationMessageComponent,
        ValidatorFormDirective,
        FormControlValidatorDirective,
        FormControlContainerValidatorDirective,
        FormFieldWrapperDirective,
        ErrorMessageContainerDirective,
        SubmissionValidationTriggerDirective,
        ValidateOnBlurDirective
    ],
    providers: [SubmissionValidationEventService]
})
export class AutomaticFormValidationModule { }
