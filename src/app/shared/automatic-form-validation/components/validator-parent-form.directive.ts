
import { Directive, ElementRef, Renderer2, OnInit, OnDestroy, Host, Optional } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { shareReplay, takeUntil } from 'rxjs/operators';
import { SubmissionValidationEventService } from '@root/shared/automatic-form-validation/services/validator-submission-event.service';
import { FormArray, FormGroup, ControlContainer } from '@angular/forms';

@Directive({
    selector: 'form[formGroup]'
})

export class ValidatorFormDirective implements OnInit, OnDestroy {
    //Export submit event to trigger the validation
    submit$ = fromEvent(this.form, 'submit').pipe(shareReplay(1));
    //Destroy subscription
    destroy$ = new Subject();


    constructor(private elementRef: ElementRef,
        public renderer: Renderer2,
        private submissionValidationTrigger: SubmissionValidationEventService,
        @Optional() @Host() private controlContainer: ControlContainer) {/* DI */ }

    get form() {
        return this.elementRef.nativeElement;
    }

    ngOnInit() {
        this.renderer.setAttribute(this.elementRef.nativeElement, 'autocomplete', 'off');
        //Mark all the fields of this form as touched if this event is triggered
        this.submissionValidationTrigger.submitted$.pipe(
            takeUntil(this.destroy$)
        ).subscribe(() => {
            this.markFormGroupTouched(this.controlContainer.control as FormGroup);
        });
    }

    ngOnDestroy() {
        this.destroy$.next(null);
    }


    private markFormGroupTouched(formGroup: FormGroup | FormArray) {
        Object.values(formGroup.controls).forEach(control => {
            control.markAsTouched();
            control.markAsDirty();
            if ((control as FormGroup) && (control as FormGroup).controls) {
                control.markAllAsTouched();
                this.markFormGroupTouched((control as FormGroup));
            }
            if ((control as FormArray) && (control as FormArray).controls) {
                control.markAllAsTouched();
                this.markFormGroupTouched((control as FormArray));
            }
        });
    }
}
