import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChatRepository } from '../store/contact-form.repository';

@Injectable({
  providedIn: 'root',
})
export class ContactFormService {
  private customerServer = `${environment.customerServer}`;

  sendMessageSubject = new BehaviorSubject<void>(null);
  sendMessageSubject$ = this.sendMessageSubject.asObservable();

  constructor(
    private httpClient: HttpClient,
    private chatRepository: ChatRepository
  ) {}

  getMessageHistory(chatId: number) {
    let endPointUrl = `${this.customerServer}/api/Message/${chatId}`;
    let httpOptions = {
      headers: new HttpHeaders(),
      params: new HttpParams(),
    };

    this.httpClient.get<any>(endPointUrl, httpOptions).subscribe((data) => {
      console.log('messagehistory dta', data); 
    });
  }

  sendMessage(data: any) {
    let endPointUrl = `${this.customerServer}/api/Message`;
    let httpOptions = {
      headers: new HttpHeaders(),
      params: new HttpParams(),
    };
    this.httpClient
      .post<any>(endPointUrl, data, httpOptions)
      .subscribe((data) => {
        console.log(data);
        this.sendMessageSubject.next();
      });
  }

  updateChat(data: any) {
    this.chatRepository.updateData(data);
  }
}
