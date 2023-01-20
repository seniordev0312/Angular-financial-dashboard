import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PolicyCard } from '../../customer-service-shared/components/policy-card/models/policy-card.model';
import { PolicyRenewalsTicketsRepository } from '../store/policy-renewals-tickets.repository';

@Injectable({
  providedIn: 'root',
})
export class PolicyCardService {
  constructor(
    private http: HttpClient,
    private policyRenewalsTicketsRepository: PolicyRenewalsTicketsRepository
  ) {}

  /*========================================
    CRUD Methods for CustomerService RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'content-type': 'application/json',
    }),
  };

  customerServiceServerURL = `${environment.customerServer}/api`;

  // Define Filter API
  apiFilterURL = `${this.customerServiceServerURL}/PolicyRenewalTicket/Filter`;
  apiPutURL = `${this.customerServiceServerURL}/PolicyRenewalTicket`;

  // HttpClient API post() method => Get PolicyRenewalTickets
  getPolicyRenewalTickets() {
    this.http
      .post<PolicyCard>(this.apiFilterURL, {}, this.httpOptions)
      .subscribe((data) => {
        this.policyRenewalsTicketsRepository.updateTickets(data);
      });
  }

  // HttpClient API post() method => create PolicyRenewalTickets
  filterPolicyRenewalTickets(option: {}) {
    this.http
      .post<PolicyCard>(this.apiFilterURL, option, this.httpOptions)
      .subscribe((data) => {
        this.policyRenewalsTicketsRepository.updateTickets(data);
      });
  }

  // HttpClient API put() method => update PolicyRenewalTickets
  updatePolicyRenewalTickets(body: {}) {
    this.http
      .put<PolicyCard>(this.apiPutURL, body, this.httpOptions)
      .subscribe(console.log);
  }

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
}
