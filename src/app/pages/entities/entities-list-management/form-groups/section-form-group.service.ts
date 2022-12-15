import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Injectable } from '@angular/core';
import { AddSection } from '../models/add-section.model';
import { SectionDetails } from '../models/section-details.model';
import { EntitiesListRepository } from '../store/entities-list.repository';

@Injectable({
    providedIn: 'root',
})
export class SectionFormGroup {
    fg: FormGroup;
    constructor(public fb: FormBuilder,
        private entitiesListRepository: EntitiesListRepository,
    ) { }

    getFormGroup(item?: SectionDetails): FormGroup {
        this.fg = this.fb.group({
            id: new FormControl(item?.entitySectionId || null),
            entitySectionTemplateId: new FormControl(item?.entitySectionTemplateId || null, [Validators.required]),
            sectionName: new FormControl(item?.sectionName || null, [Validators.required]),
        });
        return this.fg;
    }

    getValueFromFormGroup(fg: FormGroup): AddSection {
        return {
            id: fg.controls.id.value,
            entitySectionTemplateId: fg.controls.entitySectionTemplateId.value,
            sectionName: fg.controls.sectionName.value,
            entityCode: this.entitiesListRepository.values.entityDetails.entityCode,
            entityName: this.entitiesListRepository.values.entityDetails.entityName
        };
    }
}
