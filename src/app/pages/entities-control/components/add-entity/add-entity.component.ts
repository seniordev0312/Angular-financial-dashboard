import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

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
  }

  toggleExpandedPanel(index: number) {
    this.expandedPanelIndex = index;
  }

  isPanelExpanded(index: number) {
    return this.expandedPanelIndex === index;
  }

}
