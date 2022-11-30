import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-emails',
  templateUrl: './emails.component.html',
  styleUrls: ['./emails.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailsComponent {

}
