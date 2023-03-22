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

    console.log(this.card);
    this.cardInfo = {
      day,
      hour,
      minute,
      leftSideBackground: bg_color,
      leftSideIcon: this.displayCategoryTypeIcon(this.card?.category),
      sourceIconUri: this.card.sourceIconUri,
      assignedToName: this.card.assignedToName,
      assignedToId: this.card.assignedToId,
      assignedToProfilePictureUri: this.card.assignedToProfilePictureUri,
      ein: this.card.ein,
      entityName: this.card.entityName,
      entityProfilePictureUri: this.card.entityProfilePictureUri,
      ticketCode: this.card.ticketCode,
      ticketTypeIconUri: this.card.ticketTypeIconUri,
      dateCreated: new Date(this.card.dateCreated).toDateString(),
    };
  }

  // get icon name according to the response value
  displayCategoryTypeIcon(response: number) {
    switch (response) {
      case 1:
        return 'customer-emergency';
      case 2:
        return 'customer-sales';
      case 3:
        return 'customer-complaints';
      case 4:
        return 'customer-other';
      case 5:
        return 'customer-claims';
      default:
        return '';
    }
  }
}
