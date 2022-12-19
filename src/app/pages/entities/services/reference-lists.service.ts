import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BaseListItem } from "@root/shared/models/base-list-item.model";
import { environment } from "src/environments/environment";
import { SharedEntitiesRepository } from "../store/shared-entities.repository";

@Injectable({ providedIn: 'root' })
export class EntitiesReferenceListsService {

    constructor(private httpClient: HttpClient,
        private sharedEntitiesRepository: SharedEntitiesRepository) { }

    getElementTypesReferenceList(): void {
        if (this.sharedEntitiesRepository.values.elementTypesReferenceList.length === 0) {
            const httpOptions = {
                headers: new HttpHeaders({
                    'InterceptorHideSpinner': '',
                }),
            };

            const endPointUrl = `${environment.entityApiUrl}/Reference/GetElementTypes`
            this.httpClient.get<BaseListItem[]>(endPointUrl, httpOptions).subscribe((data) => {
                this.sharedEntitiesRepository.updateElementTypesReferenceList(data);
            });
        }
    }
}