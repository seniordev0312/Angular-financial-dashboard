import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PolicyCard } from '@root/pages/customer-service/customer-service-shared/components/policy-card/models/policy-card.model';
import { PolicyCardService } from '@root/pages/customer-service/policy-renewals/services/policy-card.service';
import { FollowUpHistoryFormGroup } from '../../../services/follow-up-history.service';
import { FollowUpActionType } from '../models/enums/follow-up-action-type.enums';
import { FollowUpHistoryService } from '../services/follow-up-history.services';


@Component({
  selector: 'app-edit-history',
  templateUrl: './edit-history.component.html',
  styleUrls: ['./edit-history.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditHistoryComponent implements OnInit {
  constructor(
    public policyCardService: PolicyCardService,
    private followUpHistoryService: FollowUpHistoryService,
    private followUpHistoryFormGroup: FollowUpHistoryFormGroup
  ) { }

  @Input() pageControl = '';
  @Input() actionFlag: number;
  @Input() data = <PolicyCard>{};
  @Output() pageControlChange = new EventEmitter<any>();

  @Input() exportHistoryData: any;

  bgColorRequest: string = 'bg-main-gray';
  bgColorSend: string = 'bg-main-gray';
  colorRequest: string = '';
  colorSend: string = '';
  pageFlag: string = 'main';
  response: number = -1;
  detailContent: string = '';
  policyPrice: string = '';
  additionalDetailContent: string = '';
  toEditCommunication: any;
  fg: FormGroup;
  isFormValid: boolean = false;

  followUpActionType: number;

  FollowUpActionType = FollowUpActionType;

  ngOnInit(): void {
    this.fg = this.followUpHistoryFormGroup.getFormGroup();

    // actionFlag = -1 means creating communication.
    if (this.actionFlag !== -1) {

      this.response = this.exportHistoryData.response;
      this.getFormControl('details').setValue(this.exportHistoryData.details);
      this.getFormControl('additionalDetails').setValue(this.exportHistoryData.additionalDetails);
      this.getFormControl('policyAgreedPrice').setValue(this.exportHistoryData.premiumPrice);
    }

    if (this.actionFlag === -1) {
      this.response = -1;
      this.getFormControl('details').setValue(null);
      this.getFormControl('additionalDetails').setValue(null);
      this.getFormControl('policyAgreedPrice').setValue(null);
    }
  }

  // displaying flag
  pageEvent(flag: string) {
    if (flag == 'request') {
      this.pageFlag = flag;
      this.bgColorRequest = 'bg-primary';
      this.colorRequest = 'color-white';
      this.fg.get('additionalDetails').setValidators([Validators.required]);
      this.fg.get('policyAgreedPrice').clearValidators();
    }
    if (flag == 'send') {
      this.pageFlag = flag;
      this.bgColorSend = 'bg-primary';
      this.colorSend = 'color-white';
      this.fg.get('policyAgreedPrice').setValidators([Validators.required]);
      this.fg.get('additionalDetails').clearValidators();
    }
    this.fg.get('policyAgreedPrice').updateValueAndValidity();
    this.fg.get('additionalDetails').updateValueAndValidity();

    this.checkFormValidity();
  }

  // get current response value(0, 1, 2)
  getResponse(res: number) {
    this.response = res;
    this.checkFormValidity();
  }

  onChangeInputValue() {
    this.checkFormValidity();
  }

  // edit existing communication
  editCommunication(editedData: any) {

    if (this.pageFlag === 'request') {
      this.followUpActionType = this.FollowUpActionType.Underwriting;
      this.policyPrice = '';
      this.getFormControl('policyAgreedPrice').setValue(this.policyPrice);
    }
    if (this.pageFlag === 'send') {
      this.followUpActionType = this.FollowUpActionType.SameTerms;
      this.additionalDetailContent = '';
      this.getFormControl('additionalDetails').setValue(this.additionalDetailContent);

    }

    const detail = {
      id: this.actionFlag,
      ticketId: editedData.id,
      response: this.response,
      details: this.getFormControl('details').getRawValue(),
      additionalDetails: this.getFormControl('additionalDetails').getRawValue(),
      premiumPrice: this.policyPrice,
      followUpActionType: this.followUpActionType
    };
    this.followUpHistoryService.updateFollowUpHistory(detail);
  }

  // create existing communication
  async createNewCommunications(dataToSave: any) {

    if (this.pageFlag === 'request') {
      this.followUpActionType = this.FollowUpActionType.Underwriting;
      this.policyPrice = '';
      this.getFormControl('policyAgreedPrice').setValue(this.policyPrice);

    }
    if (this.pageFlag === 'send') {
      this.followUpActionType = this.FollowUpActionType.SameTerms;
      this.additionalDetailContent = '';
      this.getFormControl('additionalDetails').setValue(this.additionalDetailContent);
    }
    const detail_saved = {
      //id: dataToSave.id,
      ticketId: dataToSave.id,
      response: this.response,
      details: this.getFormControl('details').getRawValue(),
      additionalDetails: this.getFormControl('additionalDetails').getRawValue(),
      premiumPrice: this.policyPrice,
      followUpActionType: this.followUpActionType,
    }
    this.followUpHistoryService.addNewFollowUpHistory(detail_saved);
  }

  checkFormValidity() {
    if (this.fg.valid && (this.response !== -1) && this.pageFlag !== 'main') {
      this.isFormValid = true;
    } else {
      this.isFormValid = false;
    }
  }

  // save current communication on edit or create action
  saveHistory() {
    if (!this.isFormValid) return;

    let currentCommunications: {}[] = [];

    switch (this.actionFlag) {
      // actionFlag = -1 means creating communication.
      case -1:
        if (
          Object.keys(this.data).length === 0 &&
          this.data.constructor === Object
        ) {
          this.createNewCommunications(currentCommunications);

        } else {
          this.createNewCommunications((this.data));
        }
        break;
      // actionFlag != -1 means edit communication[actionFlag]
      default:
        this.editCommunication((this.data));
        break;
    }
    this.pageControlChange.emit('first');

  }

  onBackToHistory() {
    this.pageControlChange.emit('first');
  }

  getFormControl(key: string): FormControl {
    return this.fg.controls[key] as FormControl;
  }
}
