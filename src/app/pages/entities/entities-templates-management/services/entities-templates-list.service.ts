import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EntityTemplatesListItem } from '../models/entity-templates-list-item.model';
import { EntitiesTemplatesRepository } from '../store/entities-templates.repository';
import { AddTemplate } from '../models/add-template.model';

@Injectable({ providedIn: 'root' })
export class EntitiesTemplatesListService {
    private baseUrl = `${environment.apiUrl}/v1.0/`;

    constructor(private httpClient: HttpClient,
        private entitiesTemplatesRepository: EntitiesTemplatesRepository) { }

    getEntitiesTemplatesList(pageIndex: number, pageSize: number, backendUrl?: string): void {
        let endPointUrl = this.baseUrl;
        let httpOptions = {
            headers: new HttpHeaders(),
            params: new HttpParams(),
        };
        if (backendUrl) {
            endPointUrl = backendUrl;
        }
        else {
            httpOptions = {
                ...httpOptions,
                params: httpOptions.params.set('PageIndex', pageIndex.toString()).set('PageSize', pageSize.toString()),
            }
        }
        this.httpClient.get<EntityTemplatesListItem[]>(endPointUrl, httpOptions).subscribe(data => {
            if (!data) {
                this.entitiesTemplatesRepository.updateTemplatesList(data);
            }
        });
    }

    getTemplateDetails(templateId: string): void {
        const endPointUrl = `${this.baseUrl}/${templateId}`
        this.httpClient.get<AddTemplate>(endPointUrl).subscribe(data => {
            if (!data) {
                this.entitiesTemplatesRepository.updateSelectedTemplate(data);
            }
        });
    }

    addTemplate(Template: AddTemplate): void {
        this.httpClient.post<EntityTemplatesListItem>(this.baseUrl, Template).subscribe(data => {
            if (!data) {
                this.entitiesTemplatesRepository.addTemplate(data);
            }
        });
    }

    editTemplate(template: AddTemplate): void {
        this.httpClient.put<EntityTemplatesListItem>(this.baseUrl, template).subscribe(data => {
            if (!data) {
                this.entitiesTemplatesRepository.updateTemplate(data);
            }
        });
    }

    deleteTemplate(templateId: number): void {
        const endPointUrl = `${this.baseUrl}/${templateId}`
        this.httpClient.delete<void>(endPointUrl).subscribe(() => {
            this.entitiesTemplatesRepository.deleteTemplate(templateId);
        });
    }
}
