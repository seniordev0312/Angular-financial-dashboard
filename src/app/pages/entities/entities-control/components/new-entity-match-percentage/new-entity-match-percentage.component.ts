import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { AddEntityEntry } from '../../models/add-entity.model';
import { EntitySimilarityModel } from '../../models/entity_similarity_model';
import { EntitiesControlService } from '../../services/entity-control.service';
import { EntitiesControlRepository } from '../../store/entities-control.repository';
import { newEntityAdded$ } from '../../store/entities-control.store';

@Component({

  selector: 'app-new-entity-match-percentage',
  templateUrl: './new-entity-match-percentage.component.html',
  styleUrls: ['./new-entity-match-percentage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewEntityMatchPercentageComponent extends BaseComponent implements OnInit, OnDestroy {

  entitySimilarity: EntitySimilarityModel[];

  constructor(private entitiesControlRepository: EntitiesControlRepository, private cdr: ChangeDetectorRef, private dialog: MatDialog,
    private entitiesControlService: EntitiesControlService, @Inject(MAT_DIALOG_DATA) public data: { addEntity: AddEntityEntry, entityCode: string, entitySimilarity: EntitySimilarityModel[] },) {
    super();
  }

  ngOnInit(): void {
    this.entitySimilarity = this.data.entitySimilarity;
    this.subscriptions.add(newEntityAdded$.subscribe(data => {
      if (data === true) {
        this.dialog.closeAll();
        this.cdr.detectChanges();
      }
    }));

    this.entitiesControlService.getSimilarEntity(this.data.addEntity, this.data.entityCode);
  }


  onBackClicked() {
    this.dialog.closeAll();
  }
  selectEIN() {
    this.dialog.closeAll();
  }

  createNew() {
    this.entitiesControlService.addEntityEntry(this.data.addEntity, this.data.entityCode);
  }

  getAvg(list: any) {
    let temp = Object.entries(list);
    let count = 0;
    temp.forEach((item) => {
      count = count + Number(item[1]);
    })
    return (count / temp.length).toFixed(2);

  }


  mergeAndSelect(list: EntitySimilarityModel) {
    // let newObject = this.data.addEntity;
    let EIN;
    const newEntity = Object.entries(list.newEntity);
    const systemEntity = Object.entries(list.systemEntity);
    const result = Object.entries(list.result);
    newEntity.forEach((newItem) => {
      systemEntity.forEach((sysItem) => {
        if (newItem[0] === sysItem[0]) {
          result.forEach((resultItem) => {
            if (resultItem[0] === newItem[0] && resultItem[1] !== 100) {
              sysItem[1] = newItem[1];
            }
          })
        }
        if (sysItem[0] === 'EIN') {
          EIN = sysItem[1];
          console.log(EIN)
        }
      })
    });
    // this.entitiesControlService.updateEntityEntry(this.data.addEntity, EIN);
  }

  ngOnDestroy(): void {
    this.entitiesControlRepository.updateEntitySimilarityModel([]);
    this.entitiesControlRepository.updateEntityAddState(false);
  }

}
