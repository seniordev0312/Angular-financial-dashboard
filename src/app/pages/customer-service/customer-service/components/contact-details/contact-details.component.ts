import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ContactDetailsService } from '../../services/contact-details.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDetailsComponent implements OnInit {
  fg: FormGroup;

  @Output()
  saveClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor(private contactDetailsService: ContactDetailsService) {}

  ngOnInit(): void {
    this.fg = this.contactDetailsService.getFormGroup();
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }

  onSave() {
    if (this.fg.invalid) return;
    this.saveClicked.emit();
  }
}
