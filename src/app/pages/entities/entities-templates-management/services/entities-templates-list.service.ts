import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EntityTemplatesListItem } from '../models/entity-templates-list-item.model';
import { EntitiesTemplatesRepository } from '../store/entities-templates.repository';
import { AddTemplate } from '../models/add-template.model';

@Injectable({ providedIn: 'root' })
export class EntitiesTemplatesListService {

    constructor(private httpClient: HttpClient,
        private entitiesTemplatesRepository: EntitiesTemplatesRepository) { }

    getEntitiesTemplatesList(): void {
        const endPointUrl = `${environment.apiUrl}/EntitySectionTemplate/GetEntitySectionTemplates`;
        this.httpClient.get<EntityTemplatesListItem[]>(endPointUrl).subscribe(data => {
            if (data) {
                this.entitiesTemplatesRepository.updateTemplatesList(data);
            }
        });
    }


    getEntitiesTemplateDetails(templateId: string): void {
        const httpOptions = {
            headers: new HttpHeaders({
                'InterceptorShowSidenavSpinner': '',
            }),
        };

        const endPointUrl = `${environment.apiUrl}/EntitySectionTemplate/GetEntitySectionTemplate/${templateId}`;
        this.httpClient.get<EntityTemplatesListItem>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.entitiesTemplatesRepository.updateSelectedTemplate(data);
            }
        });
    }

    addTemplate(Template: AddTemplate): void {
        const endPointUrl = `${environment.apiUrl}/EntitySectionTemplate/CreateEntitySectionTemplate`
        this.httpClient.post<EntityTemplatesListItem>(endPointUrl, Template).subscribe(data => {
            if (data) {
                this.entitiesTemplatesRepository.addTemplate(data);
            }
        });
    }

    editTemplate(template: AddTemplate): void {
        const httpOptions = {
            params: new HttpParams().set('entitySectionTemplateId', template.entitySectionTemplateId)
        };
        const endPointUrl = `${environment.apiUrl}/EntitySectionTemplate/UpdateSectionTemplate`;
        this.httpClient.put<EntityTemplatesListItem>(endPointUrl, template, httpOptions).subscribe(data => {
            if (data) {
                this.entitiesTemplatesRepository.updateTemplate(data);
            }
        });
    }

    deleteTemplate(templateId: string): void {
        const endPointUrl = `${environment.apiUrl}/EntitySectionTemplate/DeleteSectionTemplate/${templateId}`
        this.httpClient.delete<void>(endPointUrl).subscribe(() => {
            this.entitiesTemplatesRepository.deleteTemplate(templateId);
        });
    }

}
