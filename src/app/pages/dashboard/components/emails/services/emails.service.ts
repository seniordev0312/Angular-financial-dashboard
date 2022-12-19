import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { EmailItem } from "../models/email-item.model";
import { EmailsRepository } from "../store/emails.repository";

@Injectable({ providedIn: 'root' })
export class EmailsService {
    private baseUrl = `${environment.customerServer}/api/Email`;

    constructor(
        private httpClient: HttpClient,
        private emailsRepository: EmailsRepository
    ) { }

    getEmails(pageIndex: number, pageSize: number, backendUrl?: string): void {
        let endPointUrl = this.baseUrl;
        let httpOptions = {
            headers: new HttpHeaders({
                'InterceptorHideSpinner': '',
            }),
            params: new HttpParams(),
        };
        if (backendUrl) {
            endPointUrl = backendUrl;
        }
        else {
            httpOptions = {
                ...httpOptions,
                params: httpOptions.params.set('PageIndex', pageIndex.toString()).set('PageSize', pageSize.toString()),
            }
        }
        this.httpClient.get<EmailItem[]>(endPointUrl, httpOptions).subscribe(data => {
            if (data) {
                this.emailsRepository.updateEmails(data);
            }
        });
    }

    getEmailMessage(messageId: any, backendUrl?: string) {
        let endPointUrl = `${this.baseUrl}/${messageId}`;
        let httpOptions = {
            headers: new HttpHeaders({
                'InterceptorHideSpinner': '',
            }),
            params: new HttpParams(),
        };

        if (backendUrl) {
            endPointUrl = backendUrl;
        }
        else {
            httpOptions = {
                ...httpOptions
            }
        }

        this.httpClient.get<any>(endPointUrl, httpOptions).subscribe(data => {
            console.log(data);
            if (data) {
                this.emailsRepository.updateEmailMessages(messageId, data);
            }
        });
    }

    AddCustomServerTicketFromEmail() {

    }
}