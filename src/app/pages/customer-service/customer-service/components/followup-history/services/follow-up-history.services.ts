import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FollowUpHistoryRepository } from '../store/follow-up-history.repository';
import { FollowUpHistory } from '../models/follow-up-history.model';
import { PolicyRenewalsTicketsRepository } from '@root/pages/customer-service/policy-renewals/store/policy-renewals-tickets.repository';

@Injectable({
    providedIn: 'root',
})
export class FollowUpHistoryService {
    constructor(
        private http: HttpClient,
        private followUpHistoryRepository: FollowUpHistoryRepository,
        public policyRenewalsTicketsRepository: PolicyRenewalsTicketsRepository
    ) { }

    /*========================================
      CRUD Methods for CustomerService RESTful API
    =========================================*/

    // Http Options
    httpOptions = {
        headers: new HttpHeaders({
            'content-type': 'application/json',
        }),
    };

    customerServiceServerURL = `${environment.customerService}/api`;

    // Define Filter API

    apiGetFollowUpHistory = `${this.customerServiceServerURL}/PolicyRenewalTicket/FollowUp`;

    // Error handling
    handleError(error: any) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(() => {
            return errorMessage;
        });
    }

    getFollowUpHistoryList(ticketId: number) {
        return this.http
            .get<FollowUpHistory>(`${this.apiGetFollowUpHistory}/${ticketId}`, this.httpOptions)
            .pipe(retry(1), catchError(this.handleError))
            .subscribe((data: FollowUpHistory) => {
                if (data) {
                    this.followUpHistoryRepository.updateFollowUpHistoryList(undefined)
                    this.followUpHistoryRepository.updateFollowUpHistoryList(data)
                }
            });
    }

    addNewFollowUpHistory(option: {}) {
        this.http
            .post<any>(this.apiGetFollowUpHistory, option, this.httpOptions)
            .subscribe((data) => {
                if (data) {
                }

            });
    }

    updateFollowUpHistory(option: {}) {
        this.http
            .put<any>(this.apiGetFollowUpHistory, option, this.httpOptions)
            //.subscribe(option)
            .subscribe((data) => {
                if (data) {
                    //this.followUpHistoryRepository.updateFollowUpHistoryList(data);
                    //this.policyRenewalsTicketsRepository.updateTickets(data);
                }

            });
    }

    deleteFollowUpHistory(followUpId: number) {
        this.http
            .delete<any>(`${this.apiGetFollowUpHistory}/${followUpId}`,).subscribe(() => {
                this.followUpHistoryRepository.updateGetFollowUpHistory(true)
            });
    }
}
