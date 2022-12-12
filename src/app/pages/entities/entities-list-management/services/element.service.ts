import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AddSection } from '../models/add-section.model';
import { ElementsListItem } from '../models/element.model';
import { ElementsListRepository } from '../store/elements-list.repository';

@Injectable({ providedIn: 'root' })
export class ElementService {
    private baseUrl = `${environment.apiUrl}/v1.0/`;

    constructor(private httpClient: HttpClient,
        private elementsListRepository: ElementsListRepository) { }


    addElement(section: AddSection, sectionId: string): void {
        const endPointUrl = `${this.baseUrl}/${sectionId}`

        this.httpClient.post<ElementsListItem>(endPointUrl, section).subscribe(data => {
            if (!data) {
                this.elementsListRepository.addElement(data, sectionId);
            }
        });
    }

    editElement(section: AddSection, sectionId: string): void {
        const endPointUrl = `${this.baseUrl}/${sectionId}`

        this.httpClient.put<ElementsListItem>(endPointUrl, section).subscribe(data => {
            if (!data) {
                this.elementsListRepository.updateElement(data, sectionId);
            }
        });
    }

    deleteElement(elementId: string, sectionId: string): void {
        const endPointUrl = `${this.baseUrl}/${sectionId}/${elementId}`
        this.httpClient.delete<void>(endPointUrl).subscribe(() => {
            this.elementsListRepository.deleteElement(elementId, sectionId);
        });
    }
}
