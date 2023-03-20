import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DraftPolicyPendingInfoService } from '../../services/draft-policy-pending-info.service';

@Component({
  selector: 'app-pending-informaiton-card',
  templateUrl: './pending-informaiton-card.component.html',
  styleUrls: ['./pending-informaiton-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PendingInformaitonCardComponent implements OnInit {
  fg: FormGroup;

  @Input() requiredData: {
    'Initiator EIN': string;
    Deductibles: string;
    'Horse Power': string;
    Picture1: string;
    Picture2: string;
    Picture3: string;
    Picture4: string;
    Picture5: string;
    Picture6: string;
    'Plate Code': string;
    'Sum Insured': string;
    'Vehicle Color': string;
    'Vehicle Make': string;
    'Vehicle Model': string;
    'Vehicle Plate Number': string;
    'Vehicle Type': string;
    'Vehicle Year': string;
  };

  constructor(
    private draftPolicyPendingInfoService: DraftPolicyPendingInfoService
  ) {}

  ngOnInit(): void {
    this.fg = this.draftPolicyPendingInfoService.getFormGroup();
    console.log("Pending Informations")
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }
}
