import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AddSection } from '../models/add-section.model';
import { SectionDetails } from '../models/section-details.model';
import { SectionsListRepository } from '../store/sections-list.repository';

@Injectable({ providedIn: 'root' })
export class SectionService {
    private baseUrl = `${environment.apiUrl}/v1.0/`;

    constructor(private httpClient: HttpClient,
        private sectionsListRepository: SectionsListRepository) { }


    addSection(section: AddSection): void {
        this.httpClient.post<SectionDetails>(this.baseUrl, section).subscribe(data => {
            if (!data) {
                this.sectionsListRepository.addSection(data);
            }
        });
    }

    editSection(section: AddSection): void {
        this.httpClient.put<SectionDetails>(this.baseUrl, section).subscribe(data => {
            if (!data) {
                this.sectionsListRepository.updateSection(data);
            }
        });
    }

    deleteSection(sectionId: string): void {
        const endPointUrl = `${this.baseUrl}/${sectionId}`
        this.httpClient.delete<void>(endPointUrl).subscribe(() => {
            this.sectionsListRepository.deleteSection(sectionId);
        });
    }
}
