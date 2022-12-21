import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { BaseListItem } from '@root/shared/models/base-list-item.model';
import { EntityDefinitionsSection } from '../../models/entity-definitions-section.model';
import { elementTypesReferenceList$ } from '@root/pages/entities/store/shared-entities.store';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-entity-section',
  templateUrl: './entity-section.component.html',
  styleUrls: ['./entity-section.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EntitySectionComponent extends BaseComponent implements OnInit {
  @Input() section: EntityDefinitionsSection;
  elementTypesReferenceList: BaseListItem[];
  fg: FormGroup;
  constructor() { super(); }

  ngOnInit(): void {
    this.subscriptions.add(elementTypesReferenceList$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.elementTypesReferenceList = data;
      }
    }));
    this.fg = this.getFormGroup(this.section);
  }


  getFormGroup(section: EntityDefinitionsSection) {
    const fg: any = {};

    section.fields.forEach(field => {
      fg[field.elementName] = field.mandatory ? new FormControl(null, Validators.required)
        : new FormControl(null);
    });
    return new FormGroup(fg);
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  getElementType(id: number) {
    return this.elementTypesReferenceList && this.elementTypesReferenceList.find(e => e.id === id).value;
  }
}
