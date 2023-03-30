import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DetailsAccordionService } from '@root/pages/customer-service/customer-service/services/details-accordion.service';

@Component({
  selector: 'app-details-accordion',
  templateUrl: './details-accordion.component.html',
  styleUrls: ['./details-accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsAccordionComponent implements OnInit {
  fg: FormGroup;

  response: number = -1;

  isFormValid: boolean = false;

  @Input()
  data: any;

  @Output()
  saveClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(private detailsAccordionService: DetailsAccordionService) {}

  ngOnInit(): void {
    this.fg = this.detailsAccordionService.getFormGroup();

    if (this.data) {
      this.fg.setValue({
        description: this.data.description,
      });
      this.response = this.data.response;
      this.checkFormValidity();
    }
  }

  getSeverityResponse(response: number) {
    this.response = response;
    this.checkFormValidity();
  }

  onChangeDetailInputValue() {
    this.checkFormValidity();
  }

  checkFormValidity() {
    if (this.fg.valid && this.response !== -1) this.isFormValid = true;
    else this.isFormValid = false;
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  onSave() {
    if (!this.isFormValid) return;
    this.saveClicked.emit({
      response: this.response,
      details: this.fg.get('description').value,
    });
  }
}
