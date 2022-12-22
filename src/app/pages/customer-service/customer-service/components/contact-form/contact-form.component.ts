import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { ContactFormService } from '../../services/contact-form.service';
import { data$ } from '../../store/contact-form.store';
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
      data$.subscribe((data) => {
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
    console.log(this.chatData);
    console.log(this.userData);
    let formData: FormData = new FormData();
    formData.append('image', this.fileBlob);
    formData.append('SenderId', this.userData.sub);
    formData.append('ChatId', this.chatData.chatId);
    console.log('this.text', this.name);
    formData.append('Body', this.text);
    formData.append('SourceCommunicationChannelId', '1');
    this.contactFormService.sendMessage(formData);
  }
}
