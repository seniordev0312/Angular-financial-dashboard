import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AddElement } from '../models/add-element-list-item.model';
import { EntityDetails } from '../models/entity-details.model';
import { EntitiesListRepository } from '../store/entities-list.repository';
import { LayoutService } from '@root/shared/services/layout.service';

@Injectable({ providedIn: 'root' })
export class ElementService {

    constructor(private httpClient: HttpClient,
        private layoutService: LayoutService,
        private entitiesListRepository: EntitiesListRepository) { }


    addElement(element: AddElement): void {
        const endPointUrl = `${environment.apiUrl}/EntityDefinition/AddEntityDefinitionSectionField`

        this.httpClient.put<EntityDetails>(endPointUrl, element).subscribe(data => {
            if (data) {
                this.entitiesListRepository.updateEntityDetails(data);
            }
        });
    }

    editElement(element: AddElement): void {
        const endPointUrl = `${environment.apiUrl}/EntityDefinition/UpdateEntityDefinitionSectionField`

        this.httpClient.put<EntityDetails>(endPointUrl, element).subscribe(data => {
            if (data) {
                this.entitiesListRepository.updateEntityDetails(data);
            }
        });
    }

    deleteElement(entityDefinitionId: string, entityDefinitionSectionId: string, fieldName: string): void {
        const endPointUrl = `${environment.apiUrl}/EntityDefinition/DeleteEntityDefinitionSectionField/${entityDefinitionId}/${entityDefinitionSectionId}/${fieldName}`
        this.httpClient.delete<EntityDetails>(endPointUrl).subscribe(data => {
            if (data) {
                this.entitiesListRepository.updateEntityDetails(data);
                this.layoutService.closeRightSideNav();
            }
        });
    }
}
