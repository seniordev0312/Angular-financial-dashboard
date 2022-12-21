import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BaseComponent } from '@root/shared/components/base-component/base-component';
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

  fileBlob: any;
  constructor() {
    super();
  }


  ngOnInit(): void {
    this.subscriptions.add(
      data$.subscribe((data) => {
        console.log(data);
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
  send() {
    if (this.fileBlob) {
      let formData: FormData = new FormData();
      formData.append('image', this.fileBlob);
      formData.append('SenderId', this.fileBlob);
      formData.append('ChatId', this.fileBlob);
      formData.append('Body', this.fileBlob);
      formData.append('SourceCommunicationChannelId', '1');
    }
  }
}
