import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EntitiesReferenceListsService } from '@root/pages/entities/services/reference-lists.service';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { AddEntityEntry } from '../../models/add-entity.model';
import { EntityDefinition } from '../../models/entity-definitions-list-item.model';
import { EntitiesControlService } from '../../services/entity-control.service';
import { entityDefinition$ } from '../../store/entities-control.store';
import { EntitySectionComponent } from '../entity-section/entity-section.component';
import { EntityTypeComponent } from '../entity-type/entity-type.component';
import { NewEntityMatchPercentageComponent } from '../new-entity-match-percentage/new-entity-match-percentage.component';

@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.scss']
})
export class AddEntityComponent extends BaseComponent implements OnInit, AfterViewInit {
  @ViewChildren(EntitySectionComponent) sections: QueryList<EntitySectionComponent>
  @ViewChild('entityType') entityType!: EntityTypeComponent;
  expandedPanelIndex: number;
  entityDefinition: EntityDefinition;
  isDefinitionFetched = false;
  entityCode: string;


  constructor(private dialog: MatDialog,
    private entitiesReferenceListsService: EntitiesReferenceListsService,
    private entitiesControlService: EntitiesControlService) { super(); }

  get sectionsData() {
    const data: any = [];
    this.sections && this.sections.forEach(item => {
      data.push({ fg: item.fg, name: item.section.sectionName });
    });
    return data;
  }

  get isValid() {
    if (this.sections?.length > 0) {
      let isValid = true;
      this.sections.forEach(section => {
        if (!section.fg.valid) {
          isValid = false;
        }
      });
      return isValid;
    }
    return false;
  }

  ngAfterViewInit(): void {
    this.subscriptions.add(this.entityType.entityTypeFormControl.valueChanges.subscribe(data => {
      this.entityCode = data;
    }));
  }

  ngOnInit(): void {
    this.entitiesControlService.getEntityDefinitionsReferenceList();
    this.entitiesReferenceListsService.getElementTypesReferenceList();
    this.subscriptions.add(entityDefinition$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.entityDefinition = data;
        this.isDefinitionFetched = true;
      }
    }));
  }


  onEntitySaved() {
    const addEntity: AddEntityEntry = { sections: [] };
    this.sections.forEach(section => {
      addEntity.sections.push({
        name: section.section.sectionName,
        properties: section.fg.value
      });
    })
    // if (isValid) {
    this.entitiesControlService.addEntityEntry(addEntity, this.entityCode);
    // this.dialog.closeAll();
    this.dialog.open(NewEntityMatchPercentageComponent, {
      width: '90%',
      height: '90%'
    });
    // }
  }

  toggleExpandedPanel(index: number) {
    this.expandedPanelIndex = index;
  }

  isPanelExpanded(index: number) {
    return this.expandedPanelIndex === index;
  }

  getFormControlsList(item: FormGroup) {
    const data: any = [];
    Object.values(item.controls).forEach(control => {
      data.push(control);
    })
    return data;
  }

  isFormControlRequired(control: FormControl) {
    const validator = control.validator({} as AbstractControl);
    if (validator && validator.required) {
      return true;
    }
    return false;
  }

  getFormControlName(item: FormGroup, index: number) {
    return Object.keys(item.controls)[index];
  }
}
