import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sticky-notes-card',
  templateUrl: './sticky-notes-card.component.html',
  styleUrls: ['./sticky-notes-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StickyNotesCardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
