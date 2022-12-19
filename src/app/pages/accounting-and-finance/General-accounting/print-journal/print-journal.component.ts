import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-print-journal',
  templateUrl: './print-journal.component.html',
  styleUrls: ['./print-journal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrintJournalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
