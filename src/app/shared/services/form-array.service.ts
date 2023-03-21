import { FormGroup, FormArray } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class FormArrayService {
    public getFormArrayItems(keyName: string, fg: FormGroup) {
        try {
            return fg?.get(keyName) as FormArray;
        }
        catch (e) {
            return new FormArray([]);
        }
    }

    public addItemToFormArray(keyName: string, fg: FormGroup, fc: any) {
        return this.getFormArrayItems(keyName, fg).push(fc);
    }

    public removeItemFromFormArray(keyName: string, fg: FormGroup, index: number) {
        return this.getFormArrayItems(keyName, fg).removeAt(index);
    }
}
