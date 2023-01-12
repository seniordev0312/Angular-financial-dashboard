import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ticketData$ } from '@root/pages/customer-service/policy-renewals/store/kyc-documents-type.store';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { OidcSecurityService } from 'angular-auth-oidc-client';

import { ContactFormService } from '../../services/contact-form.service';

const buffer = require('buffer').Buffer;
@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactFormComponent extends BaseComponent implements OnInit {
  file?: File;
  toUploadImag: any;
  chatData: any;
  fileBlob: any;
  userData: any;
  text: any;
  name = new FormControl('');
  constructor(
    private oidcSecurityService: OidcSecurityService,
    private contactFormService: ContactFormService,
  ) {
    super();
  }


  ngOnInit(): void {
    this.subscriptions.add(
      ticketData$.subscribe((data) => {
        this.chatData = data;
        console.log('Chat Data:', data);
      })
    )
    this.oidcSecurityService.getUserData().subscribe((data: any) => {
      this.userData = data;
    })

    this.subscriptions.add(
      this.contactFormService.sendMessageSubject$.subscribe((_data: any) => {
        this.text = '';
      })
    )
  }

  onChange(event: any) {
    if (event.target.value) {
      const file = event.target.files[0];
      // const type = file.type;
      this.changeFile(file).then((base64: string): any => {
        console.log(base64);
        this.fileBlob = buffer.from(base64, 'base64').toString('latin1');
        console.log(this.fileBlob)
      });
    } else alert('Nothing')
  }

  changeFile(file: any) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }
  onKey(value: string) {
    console.log(value);
    this.text = this.text + value;
  }

  send() {
    console.log(this.chatData.chatId.toString());
    console.log(this.userData.sub);
    console.log(this.text);
    console.log(this.userData.sub);
    let formData: FormData = new FormData();
    formData.append('image', this.fileBlob);
    formData.append('SenderId', this.userData.sub);
    formData.append('ChatId', this.chatData.chatId.toString());
    formData.append('Body', this.text);
    formData.append('SourceCommunicationChannelId', '1');
    this.text = '';
    this.contactFormService.sendMessage(formData);
  }
}
