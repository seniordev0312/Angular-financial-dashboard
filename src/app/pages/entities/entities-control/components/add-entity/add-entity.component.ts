import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { EntityDefinition } from '../../models/entity-definitions-list-item.model';
import { EntitiesControlService } from '../../services/entity-control.service';
import { entityDefinition$ } from '../../store/entities-control.store';
import { NewEntityMatchPercentageComponent } from '../new-entity-match-percentage/new-entity-match-percentage.component';

@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.scss']
})
export class AddEntityComponent extends BaseComponent implements OnInit {
  expandedPanelIndex: number;
  entityDefinition: EntityDefinition;
  isDefinitionFetched = false;

  constructor(private dialog: MatDialog,
    private entitiesControlService: EntitiesControlService) { super(); }

  ngOnInit(): void {
    this.entitiesControlService.getEntityDefinitionsReferenceList()
    this.subscriptions.add(entityDefinition$.subscribe(data => {
      if (!this.isEmpty(data)) {
        this.entityDefinition = data;
        this.isDefinitionFetched = true;
      }
    }));
  }

  onEntitySaved() {
    this.dialog.closeAll();
    this.dialog.open(NewEntityMatchPercentageComponent, {
      width: '90%',
      height: '90%'
    });
  }

  toggleExpandedPanel(index: number) {
    this.expandedPanelIndex = index;
  }

  isPanelExpanded(index: number) {
    return this.expandedPanelIndex === index;
  }

}
