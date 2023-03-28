import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OutcomeAccordionService } from '@root/pages/customer-service/customer-service/services/outcome-accordion.service';

@Component({
  selector: 'app-outcome-accordion',
  templateUrl: './outcome-accordion.component.html',
  styleUrls: ['./outcome-accordion.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OutcomeAccordionComponent implements OnInit {
  @Input() outcomeText: string = 'Outcome';

  @Output()
  saveClicked: EventEmitter<any> = new EventEmitter<any>();

  response: number = -1;

  isFormValid: boolean = false;

  fg: FormGroup;

  constructor(private outcomeAccordionService: OutcomeAccordionService) {}

  ngOnInit(): void {
    this.fg = this.outcomeAccordionService.getFormGroup();
  }

  // get current response value(0, 1, 2)
  getResponse(res: number) {
    this.response = res;

    this.checkFormValidity();
  }

  onChangeInputValue() {
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

    this.saveClicked.emit({
      outcome: this.fg.get('outcome').value,
      response: this.response,
    });
  }
}
