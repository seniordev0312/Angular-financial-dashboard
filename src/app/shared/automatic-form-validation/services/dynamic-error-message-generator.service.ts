import { Injectable, ComponentRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { ValidationErrorMappingService } from '@root/shared/automatic-form-validation/services/validation-message-generator.service';
import { ValidationMessageComponent } from '@root/shared/automatic-form-validation/components/validation-error-message.component';
import { ValidationErrors } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})

export class ErrorDynamicGeneratorService {

    ref: ComponentRef<ValidationMessageComponent> = null;
    vcr: ViewContainerRef;

    constructor(
        private errorsValidator: ValidationErrorMappingService,
        private resolver: ComponentFactoryResolver,
    ) {
    }


    onErrorOccurred(controlErrors: ValidationErrors, control: any, vcr: ViewContainerRef) {
        if (controlErrors) {
            //Get all errors keys
            const controlErrorsKeys = Object.keys(controlErrors);
            const controlFirstError = controlErrorsKeys[0];
            //Get the corresponding function to create message from map

            const errorMessageFunc = this.errorsValidator.errorMessages[controlFirstError];
            if (errorMessageFunc) {
                //Get the message from function by passing the corresponding error object
                const message = errorMessageFunc(control.errors[controlFirstError]);
                if (message) {
                    //Create a new component to handle the message
                    this.displayError(message, vcr);
                }
            }
        }
        else {
            if (this.ref !== null) {
                this.displayError(null, vcr);
            }
        }
    }

    displayError(message: string, vcr: ViewContainerRef) {
        //Create a new component of ValidationMessageComponent
        if (this.ref === null) {
            const factory = this.resolver.resolveComponentFactory(ValidationMessageComponent);
            //If the optional container was empty, create the component within the formFieldWrapper container
            vcr.clear();
            this.ref = vcr.createComponent(factory);
        }
        this.ref.instance.text = message;
    }
}
