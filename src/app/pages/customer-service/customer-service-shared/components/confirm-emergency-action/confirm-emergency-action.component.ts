import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-emergency-action',
  templateUrl: './confirm-emergency-action.component.html',
  styleUrls: ['./confirm-emergency-action.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmEmergencyActionComponent implements OnInit {
  isActionConfirmed: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ConfirmEmergencyActionComponent>
  ) {}

  ngOnInit(): void {}

  onClose() {
    this.dialogRef.close({ emergencyAction: this.data.emergencyAction.id });
  }

  onConfirm() {
    this.isActionConfirmed = true;
  }
}
