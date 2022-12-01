import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { RouteCrumb } from "../models/bread-crumbs/router-crumbs-list.model";

@Injectable({
    providedIn: 'root',
})
export class UiService {
    private updateContentHeader = new Subject<any>();
    constructor() { }

    toggleUpdateContentHeader(data: RouteCrumb): void {
        this.updateContentHeader.next(data);
    }

    onUpdateContentHeaderToggle(): Observable<any> {
        return this.updateContentHeader.asObservable();
    }
}