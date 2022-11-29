import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root',
})
export class ObjectDataCompareTransformer {
    transform(tReference: any, dataToTransform: any): any {
        const changedObjectProps: any = {};
        Object.keys(tReference).forEach((key: string) => {
            if (!_.isEqual(tReference[key], dataToTransform[key])) {
                changedObjectProps[key] = tReference[key];
            }
        });
        return changedObjectProps;
    }

    transformBothSids(tReference: any, dataToTransform: any): any {
        const changedObjectProps: any = {};
        if (tReference) {
            Object.keys(tReference).forEach((key: string) => {
                if (!_.isEqual(tReference[key], dataToTransform[key])) {
                    changedObjectProps[key] = tReference[key];
                }
            });
            Object.keys(dataToTransform).forEach((key: string) => {
                if (!_.isEqual(dataToTransform[key], tReference[key])) {
                    changedObjectProps[key] = dataToTransform[key];
                }
            });
        }
        return changedObjectProps;
    }
}
