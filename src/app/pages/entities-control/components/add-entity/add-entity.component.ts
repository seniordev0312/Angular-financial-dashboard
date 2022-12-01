import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewEntityMatchPercentageComponent } from '../new-entity-match-percentage/new-entity-match-percentage.component';

@Component({
  selector: 'app-add-entity',
  templateUrl: './add-entity.component.html',
  styleUrls: ['./add-entity.component.scss']
})
export class AddEntityComponent {
  expandedPanelIndex: number;
  constructor(private dialog: MatDialog) { }

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
