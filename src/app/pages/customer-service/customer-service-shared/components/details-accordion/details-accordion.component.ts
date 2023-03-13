import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DetailsAccordionService } from '@root/pages/customer-service/customer-service/services/details-accordion.service';

@Component({
  selector: 'app-details-accordion',
  templateUrl: './details-accordion.component.html',
  styleUrls: ['./details-accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsAccordionComponent implements OnInit {
  detailDescriptionContent: string = '';

  fg: FormGroup;

  response: number = -1;

  isFormValid: boolean = false;

  constructor(
       private detailsAccordionService: DetailsAccordionService
  ) {}

  ngOnInit(): void {
    this.fg = this.detailsAccordionService.getFormGroup();
  }

  getSeverityResponse(response: number) {
    console.log(response);
    this.checkFormValidity();
  }

  onChangeDetailInputValue() {
    this.checkFormValidity();
  }

  checkFormValidity() {
    if (this.fg.valid && this.response !== -1) {
      this.isFormValid = true;
    } else {
      this.isFormValid = false;
    }
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  onSave() {
    if (!this.isFormValid) return;
  }
}
