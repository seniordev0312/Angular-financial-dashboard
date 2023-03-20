import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ProfilePreview } from '../models/profile-preview.model';
import { EntitiesViewerRepository } from '../store/entities-viewer.repository';
import { EntityTemplate } from '@root/shared/models/entities/entity-template.model';

@Injectable({ providedIn: 'root' })
export class EntitiesViewerService {
    private baseUrl = `${environment.entityApiUrl}/v1.0/`;

    constructor(private httpClient: HttpClient,
        private entitiesViewerRepository: EntitiesViewerRepository) { }

    getProfileOverview(): void {
        this.httpClient.get<ProfilePreview>(this.baseUrl).subscribe(data => {
            if (!data) {
                this.entitiesViewerRepository.updateProfileOverview(data);
            }
        });
    }


    getEntityInformation(): void {
        this.httpClient.get<EntityTemplate>(this.baseUrl).subscribe(data => {
            if (!data) {
                this.entitiesViewerRepository.updateEntityInformation(data);
            }
        });
    }
}
