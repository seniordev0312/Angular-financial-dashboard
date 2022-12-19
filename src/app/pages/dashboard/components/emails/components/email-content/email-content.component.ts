import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-content',
  templateUrl: './email-content.component.html',
  styleUrls: ['./email-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailContentComponent implements OnInit {

  @Input() emailContent: any;

  constructor() { }

  ngOnInit(): void {
  }

}
