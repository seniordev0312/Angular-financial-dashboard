import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { PolicyCard } from './models/policy-card.model';

@Component({
  selector: 'app-policy-card',
  templateUrl: './policy-card.component.html',
  styleUrls: ['./policy-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyCardComponent implements OnInit {
  @Input() card?: PolicyCard;
  cardInfo: any = {};

  constructor() {}

  ngOnInit(): void {
    const initial_url = '../../../../../../assets/images/profile.svg';
    const mil_seconds = 3600 * 24 * 1000;
    const date = new Date().getTime() - Date.parse(this.card.dateCreated);
    const day = Math.floor(date / mil_seconds);
    const hour = Math.floor(
      Math.floor(date - day * mil_seconds) / (3600 * 1000)
    );
    const minute = Math.floor(
      (date - day * (3600 * 1000 * 24) - hour * (3600 * 1000)) / 1000 / 60
    );
    let bg_color;
    if (day < 1) {
      bg_color = 'bg-[#186aa5]';
    } else if (day >= 1 && day < 4) {
      bg_color = 'bg-[#fdce31]';
    } else {
      bg_color = 'bg-[#FD3B31]';
    }

    this.cardInfo = {
      day,
      hour,
      minute,
      leftSideBackground: bg_color,
      leftSideIcon: this.card.ticketTypeIconUri,
      sourceIconUrl: this.card.sourceIconUrl,
      assignedToName: this.card.assignedToName,
      assignedToProfilePictureUri: this.card.assignedToProfilePictureUri,
      ein: this.card.ein,
      entityName: this.card.entityName,
      entityProfilePictureUri: this.card.entityProfilePictureUri
        ? this.card.entityProfilePictureUri
        : initial_url,
      ticketCode: this.card.ticketCode,
      ticketTypeIconUri: this.card.ticketTypeIconUri,
      dateCreated: new Date(this.card.dateCreated).toDateString(),
    };
  }
}
