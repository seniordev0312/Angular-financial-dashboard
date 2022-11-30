import { Injectable } from '@angular/core';
import { isEqual } from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class ObjectDataCompareTransformer {
    transform(tReference: any, dataToTransform: any): any {
        const changedObjectProps: any = {};
        Object.keys(tReference).forEach((key: string) => {
            if (!isEqual(tReference[key], dataToTransform[key])) {
                changedObjectProps[key] = tReference[key];
            }
        });
        return changedObjectProps;
    }

    transformBothSids(tReference: any, dataToTransform: any): any {
        const changedObjectProps: any = {};
        if (tReference) {
            Object.keys(tReference).forEach((key: string) => {
                if (!isEqual(tReference[key], dataToTransform[key])) {
                    changedObjectProps[key] = tReference[key];
                }
            });
            Object.keys(dataToTransform).forEach((key: string) => {
                if (!isEqual(dataToTransform[key], tReference[key])) {
                    changedObjectProps[key] = dataToTransform[key];
                }
            });
        }
        return changedObjectProps;
    }
}
