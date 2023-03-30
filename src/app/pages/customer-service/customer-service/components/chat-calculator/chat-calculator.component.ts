import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CalculatorFormGroupService } from '../../services/calculator-form-group.service';

@Component({
  selector: 'app-chat-calculator',
  templateUrl: './chat-calculator.component.html',
  styleUrls: ['./chat-calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatCalculatorComponent implements OnInit {
  fgCar: FormGroup;

  minSumInsured: number = 24500;
  maxSumInsured: number = 28500;

  selectedPricingCalculateBtn: number = -1;

  
  calculatorClicked: boolean = false;

  @Input()
  canShowCalculator: boolean;

  constructor(
    private calculatorFormGroupService: CalculatorFormGroupService
  ) {}

  ngOnInit(): void {
    this.fgCar = this.calculatorFormGroupService.getFormGroup();
  }

  getFormControl(key: string): FormControl {
    return this.fgCar.controls[key] as FormControl;
  }
  
  onClickPricingBtn(btnValue: number) {
    this.selectedPricingCalculateBtn = btnValue;
  }

    onClickCalculator() {
    this.calculatorClicked = !this.calculatorClicked;
  }
}
