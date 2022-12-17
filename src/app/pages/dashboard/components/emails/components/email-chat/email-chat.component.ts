import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-email-chat',
  templateUrl: './email-chat.component.html',
  styleUrls: ['./email-chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmailChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
