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
    this.cdr.detectChanges();
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
    let tempList: any = [];
    list.forEach((item: any) => {
      tempList = [...tempList, ...Object.entries(item.properties)]
    });

    let count = 0;
    tempList.forEach((item: any) => {
      count = count + Number(item[1]);
    })
    return (count / tempList.length).toFixed(2);

  }


  mergeAndSelect(list: any) {
    let EIN;
    const newEntity = this.data.addEntity;
    newEntity.sections.forEach((secItem: any) => {
      list.systemEntity.forEach((sysItem: any) => {
        if (secItem.name === sysItem.name) {
          let tempPropertiesSections = Object.entries(secItem.properties);
          let tempPropertiesSystem = Object.entries(sysItem.properties);
          tempPropertiesSections.forEach((secPropItem) => {
            tempPropertiesSystem.forEach((sysPropItem) => {
              if (sysPropItem[0] === 'EIN') {
                EIN = sysPropItem[1];
              }
              if (secPropItem[0] === sysPropItem[0]) {
                list.result.forEach((secResult: any) => {
                  if (secItem.name === secResult.name) {
                    let tempPropertiesResult = Object.entries(secResult.properties);
                    tempPropertiesResult.forEach((resultPropItem) => {
                      if (resultPropItem[0] === sysPropItem[0]) {
                        if (resultPropItem[1] < 75) { }
                      }
                    })
                  }

                })
              }
            })
          })
        }
      });
    });
    this.entitiesControlRepository.updateEntityAddState(false);
    this.entitiesControlService.updateEntityEntry(this.data.addEntity, EIN);
  }


  ngOnDestroy(): void {
    this.entitiesControlRepository.updateEntitySimilarityModel([]);
    this.entitiesControlRepository.updateEntityAddState(false);
  }

}
