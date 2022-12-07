import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sticky-notes',
  templateUrl: './sticky-notes.component.html',
  styleUrls: ['./sticky-notes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyNotesComponent implements OnInit {
  items: any[] = [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]
  constructor() { }

  ngOnInit(): void {
  }

  addStickyNote(): void {

  }
}
