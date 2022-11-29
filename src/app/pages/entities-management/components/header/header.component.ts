import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { EntitiesManagementComponent } from '../entities-management/entities-management.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<EntitiesManagementComponent>) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }
}
