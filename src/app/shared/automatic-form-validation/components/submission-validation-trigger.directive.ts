import { Directive, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { fromEvent, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SubmissionValidationEventService } from '@root/shared/automatic-form-validation/services/validator-submission-event.service';
@Directive({
    selector: '[appFormValidationTrigger]'
})

export class SubmissionValidationTriggerDirective implements OnInit, OnDestroy {
    destroy$ = new Subject();

    constructor(private elementRef: ElementRef,
        private submissionValidationEventService: SubmissionValidationEventService) { }

    ngOnInit() {
        fromEvent(this.elementRef.nativeElement, 'click').pipe(
            takeUntil(this.destroy$)
        ).subscribe(() => {
            //TODO add form name or id to only trigger a specific form if there is more than one form in the page
            this.submissionValidationEventService.submitted$.next(null);
        });
    }
    ngOnDestroy() {
        this.destroy$.next(null);
    }
}
