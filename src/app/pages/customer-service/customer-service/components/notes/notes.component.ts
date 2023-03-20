import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotesComponent implements OnInit {
  @Input() ticketNoteData: string;
  @Output() noteSubmitted: EventEmitter<any> = new EventEmitter<any>();

  formNote: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    console.log(this.ticketNoteData);
    this.formNote = this.formBuilder.group({
      note : new FormControl(this.ticketNoteData),
    })
  }

  submitNote() {
    let value: string = this.formNote.get('note').value;
    this.noteSubmitted.emit(value);
  }
}
