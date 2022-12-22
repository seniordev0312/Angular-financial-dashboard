import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { EmailItem } from "../models/email-item.model";
import { EmailsRepository } from "../store/emails.repository";

@Injectable({ providedIn: 'root' })
export class EmailsService {
    private baseUrl = `${environment.customerServer}/api`;

    constructor(
        private httpClient: HttpClient,
        private emailsRepository: EmailsRepository
    ) { }

    getEmails(pageIndex: number, pageSize: number): void {
        let endPointUrl = `${this.baseUrl}/Email`;
        let httpOptions = {
            headers: new HttpHeaders({
                'InterceptorHideSpinner': '',
            }),
            params: new HttpParams().set('PageIndex', pageIndex.toString()).set('PageSize', pageSize.toString()),
        };
        this.httpClient.get<EmailItem[]>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.emailsRepository.updateEmails(data);
            }
        });
    }

    getEmailMessage(messageId: any) {
        let endPointUrl = `${this.baseUrl}/Email/${messageId}`;
        let httpOptions = {
            headers: new HttpHeaders({
                'InterceptorShowSidenavSpinner': '',
            }),
            params: new HttpParams(),
        };

        this.httpClient.get<any>(endPointUrl, httpOptions).subscribe(data => {
            console.log(data);
            if (data) {
                this.emailsRepository.updateEmailMessages(messageId, data);
            }
        });
    }

    AddCustomServerTicketFromEmail() {

    }

    AddEmail(emails: any) {
        this.emailsRepository.addEmail(emails);
    }
    createTicket(ticketData: any) {
        let endPointUrl = `${this.baseUrl}/CustomerServiceTicket`;
        let httpOptions = {
            headers: new HttpHeaders({
                'InterceptorHideSpinner': '',
            }),
            params: new HttpParams(),
        };
        this.httpClient.post<any>(endPointUrl, ticketData, httpOptions).subscribe(data => {
            if (data) {
                console.log(data);
            }
        });
    }
}