import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AddSection } from '../models/add-section.model';
import { EntityDetails } from '../models/entity-details.model';
import { EntitiesListRepository } from '../store/entities-list.repository';
import { LayoutService } from '@root/shared/services/layout.service';

@Injectable({ providedIn: 'root' })
export class SectionService {

    constructor(private httpClient: HttpClient,
        private layoutService: LayoutService,
        private entitiesListRepository: EntitiesListRepository) { }


    addOrUpdateSection(section: AddSection): void {
        const endPointUrl = `${environment.apiUrl}/EntityDefinition/CreateOrUpdateEntityDefinition`;
        this.httpClient.post<EntityDetails>(endPointUrl, section).subscribe(data => {
            if (data) {
                this.entitiesListRepository.updateEntityDetails(data);
            }
        });
    }

    deleteSection(entityDefinitionId: string, entityDefinitionSectionId: string): void {
        const endPointUrl = `${environment.apiUrl}/EntityDefinition/DeleteEntityDefinitionSection/${entityDefinitionId}/${entityDefinitionSectionId}`
        this.httpClient.delete<EntityDetails>(endPointUrl).subscribe((data) => {
            if (data) {
                this.entitiesListRepository.updateEntityDetails(data);
                this.layoutService.closeRightSideNav();
            }
        });
    }
}
