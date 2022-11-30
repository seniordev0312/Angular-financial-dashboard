import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ContentHeaderModel } from '@root/shared/models/content-header/content.header';
@Component({
  selector: 'app-content-header',
  templateUrl: './content-header.component.html',
  styleUrls: ['./content-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentHeaderComponent implements OnInit {


  @Input() contentHeaderModel: ContentHeaderModel;

  constructor() {
  }

  ngOnInit(): void {
  }
}
