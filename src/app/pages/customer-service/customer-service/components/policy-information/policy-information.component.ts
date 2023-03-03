import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PolicyInformationService } from '../../services/policy-information.service';

@Component({
  selector: 'app-policy-information',
  templateUrl: './policy-information.component.html',
  styleUrls: ['./policy-information.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyInformationComponent implements OnInit {
  fg: FormGroup;

  constructor(private policyInformationService: PolicyInformationService) {}

  ngOnInit(): void {
    this.fg = this.policyInformationService.getFormGroup();
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }
}
