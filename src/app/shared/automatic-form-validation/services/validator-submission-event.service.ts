import {Injectable} from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SubmissionValidationEventService {
    submitted$ = new Subject();
}
