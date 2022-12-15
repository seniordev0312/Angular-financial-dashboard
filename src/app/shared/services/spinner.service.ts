import { Injectable } from '@angular/core';
import { SharedRepository } from '../store/shared.repository';


@Injectable({
    providedIn: 'root',
})
export class SpinnerService {
    constructor(private sharedRepository: SharedRepository) { }

    startSpinning() {
        this.sharedRepository.startSpinning();
    }

    stopSpinning() {
        this.sharedRepository.stopSpinning();
    }

    startSidenavSpinning() {
        this.sharedRepository.startSidenavSpinning();
    }

    stopSidenavSpinning() {
        this.sharedRepository.stopSidenavSpinning();
    }
}
