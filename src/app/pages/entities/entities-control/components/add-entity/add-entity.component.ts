import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren, Inject, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EntitiesReferenceListsService } from '@root/pages/entities/services/reference-lists.service';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { AddEntityEntry } from '../../models/add-entity.model';
import { EntityDefinition } from '../../models/entity-definitions-list-item.model';
import { EntityEntriesListItem } from '../../models/entity-entries-list-item.model';
import { EntitySimilarityModel } from '../../models/entity_similarity_model';
import { EntitiesControlService } from '../../services/entity-control.service';
import { EntitiesControlRepository } from '../../store/entities-control.repository';
import { entityDefinition$, selectedEntity$ } from '../../store/entities-control.store';
import { EntitySectionComponent } from '../entity-section/entity-section.component';
import { EntityTypeComponent } from '../entity-type/entity-type.component';
import { NewEntityMatchPercentageComponent } from '../new-entity-match-percentage/new-entity-match-percentage.component';

@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class AddEntityComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChildren(EntitySectionComponent) sections: QueryList<EntitySectionComponent>
  @ViewChild('entityType') entityType!: EntityTypeComponent;
  expandedPanelIndex: number;
  entityDefinition: EntityDefinition;
  isDefinitionFetched = false;
  entityCode: string;
  entityName: string;
  isUpdateMode = false;
  isViewMode = false;
  selectedEntity: EntityEntriesListItem;
  ein: string;
  constructor(private dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cdr: ChangeDetectorRef,
    private entitiesReferenceListsService: EntitiesReferenceListsService,
    private entitiesControlRepository: EntitiesControlRepository,
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
    if (this.entityType) {
      this.subscriptions.add(this.entityType?.entityTypeFormControl?.valueChanges.subscribe(data => {
        this.entityCode = data;
      }));
    }
  }

  ngOnInit(): void {
    this.entitiesControlService.getEntityDefinitionsReferenceList();
    this.entitiesReferenceListsService.getElementTypesReferenceList();
    this.subscriptions.add(entityDefinition$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.entityDefinition = data;
        this.isDefinitionFetched = true;
        this.cdr.detectChanges();
      }
    }));
    if (this.data.ein) {
      this.ein = this.data.ein;
      this.entitiesControlService.getEntityEntryDetails(this.data.ein);
      this.isUpdateMode = this.data.mode === 'edit';
      this.isViewMode = this.data.mode === 'view';
    }
    this.subscriptions.add(selectedEntity$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.entityCode = data.entityCode;
        this.selectedEntity = data;
        this.entitiesControlService.getEntityDefinitionsList(this.entityCode);
        this.entityName = data.name;
        this.cdr.detectChanges();
      }
    }));



  }

  openSimilarityDialog(addEntity: AddEntityEntry, entityCode: string, entitySimilarity: EntitySimilarityModel[]) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.data = {
      addEntity: addEntity,
      entityCode: entityCode,
      entitySimilarity: entitySimilarity
    }
    const CurrentDialog = this.dialog.open(NewEntityMatchPercentageComponent, dialogConfig);
    console.log(CurrentDialog);
  }

  onEntitySaved() {
    const addEntity: AddEntityEntry = { sections: [] };
    this.sections.forEach(section => {
      addEntity.sections.push({
        name: section.section.sectionName,
        properties: section.fg.value
      });
    });
    this.checkSimilarEntity(addEntity, this.entityCode);

  }

  async checkSimilarEntity(addEntity: any, ein: any) {
    const result = this.entitiesControlService.checkSimilarEntity(addEntity, ein);
    result.subscribe({
      error: (_error: any) => {
      },
      next: async (data: any) => {
        if (!this.isEmpty(data)) {
          this.openSimilarityDialog(addEntity, ein, data);
        } else {
          this.entitiesControlService.addEntityEntry(addEntity, ein);
          this.dialog.closeAll();
        }
        this.cdr.detectChanges();
      },
      complete: async () => { },
    });
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
    const validator = control.hasValidator;
    if (validator) {
      return true;
    }
    return false;
  }

  getFormControlName(item: FormGroup, index: number) {
    return Object.keys(item.controls)[index];
  }

  ngOnDestroy(): void {
    this.entitiesControlRepository.updateSelectedEntityEntry({} as EntityEntriesListItem);
    this.entitiesControlRepository.updateEntitiesDefinitionsList({} as EntityDefinition);
    this.entitiesControlRepository.updateEntitySimilarityModel([]);
    this.entitiesControlRepository.updateEntityAddState(false);
  }
}
