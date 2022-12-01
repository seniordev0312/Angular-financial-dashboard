import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entities-viewer',
  templateUrl: './entities-viewer.component.html',
  styleUrls: ['./entities-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntitiesViewerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
