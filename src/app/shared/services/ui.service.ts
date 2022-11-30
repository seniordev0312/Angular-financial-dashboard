import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { ContentHeaderModel } from "../models/content-header/content.header";

@Injectable({
    providedIn: 'root',
})
export class UiService {
    private updateContentHeader = new Subject<any>();
    constructor() { }

    toggleUpdateContentHeader(data: ContentHeaderModel): void {
        this.updateContentHeader.next(data);
    }

    onUpdateContentHeaderToggle(): Observable<any> {
        return this.updateContentHeader.asObservable();
    }
}