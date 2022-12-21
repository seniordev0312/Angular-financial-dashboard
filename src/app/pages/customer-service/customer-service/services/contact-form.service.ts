import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { ChatRepository } from "../store/contact-form.repository";

@Injectable({
    providedIn: 'root'
})
export class ContactFormService {
    private customerServer = `${environment.customerServer}`;

    constructor(
        private httpClient: HttpClient,
        private chatRepository: ChatRepository,

    ) {

    }
    sendMessage(_data: any) {
        let endPointUrl = `${this.customerServer}/api/Message`;
        let httpOptions = {
            headers: new HttpHeaders(),
            params: new HttpParams(),
        };

        this.httpClient.post<any>(endPointUrl, {}, httpOptions).subscribe(data => {
            if (data) {

            }
        });
    }

    updateChat(data: any) {
        this.chatRepository.updateData(data);
    }
}