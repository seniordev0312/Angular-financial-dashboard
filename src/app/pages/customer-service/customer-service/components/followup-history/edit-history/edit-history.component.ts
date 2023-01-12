import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { PolicyCard } from '@root/pages/customer-service/policy-renewals/components/policy-card/models/policy-card.model';
import { PolicyCardService } from '@root/pages/customer-service/policy-renewals/services/policy-card.service';

@Component({
  selector: 'app-edit-history',
  templateUrl: './edit-history.component.html',
  styleUrls: ['./edit-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditHistoryComponent implements OnInit {
  constructor(public policyCardService: PolicyCardService) {}

  @Input() pageControl = '';
  @Input() actionFlag: number;
  @Input() data = <PolicyCard>{};
  @Output() pageControlChange = new EventEmitter<any>();

  bgColorRequest: string = 'bg-main-gray';
  bgColorSend: string = 'bg-main-gray';
  colorRequest: string = '';
  colorSend: string = '';
  pageFlag: string = 'main';
  response: number;
  detailContent: string = '';
  policyPrice: string = '';
  additionalDetailContent: string = '';
  toEditCommunciation: any;

  ngOnInit(): void {
    // actionFlag = -1 means creating communication.
    if (this.actionFlag !== -1) {
      this.toEditCommunciation = Object.values(this.data.detailsJson)[
        this.actionFlag
      ];

      this.response = this.toEditCommunciation.response;
      this.detailContent = this.toEditCommunciation.detailContent;
      this.policyPrice = this.toEditCommunciation.policyPrice;
      this.additionalDetailContent =
        this.toEditCommunciation.additionalDetailContent;
      console.log('resonse', this.response);
    }
  }

  // displaying flag
  pageEvent(flag: string) {
    if (flag == 'request') {
      this.pageFlag = flag;
      this.bgColorRequest = 'bg-primary';
      this.colorRequest = 'color-white';
    }
    if (flag == 'send') {
      this.pageFlag = flag;
      this.bgColorSend = 'bg-primary';
      this.colorSend = 'color-white';
    }
  }

  // get current response value(0, 1, 2)
  getResponse(res: number) {
    this.response = res;
  }

  // edit existing communication
  editCommunciation(currentArray: {}[]) {
    const detail = {
      id: this.actionFlag,
      response: this.response,
      detailContent: this.detailContent,
      policyPrice: this.policyPrice,
      additionalDetailContent: this.additionalDetailContent,
      date: new Date(),
    };

    currentArray.splice(this.actionFlag, 1, detail);

    this.data.detailsJson = Object.assign({}, currentArray);
    this.policyCardService.updatePolicyRenewalTickets(this.data);
  }

  // create existing communication
  createNewCommunications(currentArray: {}[]) {
    const detail = {
      id: currentArray.length,
      response: this.response,
      detailContent: this.detailContent,
      policyPrice: this.policyPrice,
      additionalDetailContent: this.additionalDetailContent,
      date: new Date(),
    };

    currentArray.push(detail);

    this.data.detailsJson = Object.assign({}, currentArray);
    this.policyCardService.updatePolicyRenewalTickets(this.data);
  }

  // save current communication on edit or create action
  saveHistory() {
    let currentCommunications: {}[] = [];

    switch (this.actionFlag) {
      // actionFlag = -1 means creating communication.
      case -1:
        if (
          Object.keys(this.data.detailsJson).length === 0 &&
          this.data.detailsJson.constructor === Object
        ) {
          this.createNewCommunications(currentCommunications);
        } else {
          this.createNewCommunications(Object.values(this.data.detailsJson));
        }
        break;
      // actionFlag != -1 means edit communication[actionFlag]
      default:
        this.editCommunciation(Object.values(this.data.detailsJson));
        break;
    }

    this.pageControlChange.emit('first');
  }
}
