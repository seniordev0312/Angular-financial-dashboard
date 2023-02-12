import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-void-action',
  templateUrl: './void-action.component.html',
  styleUrls: ['./void-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VoidActionComponent implements OnInit {

  constructor(public dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  onClose() : void {
    this.dialog.closeAll();
  }

}
