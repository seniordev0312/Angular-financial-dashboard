import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PolicyCard } from '../../customer-service-shared/components/policy-card/models/policy-card.model';
import { TicketCategory } from '../models/ticket-category.model';
import { CustomerServiceTicketsRepository } from '../store/customer-service-tickets.repository';

@Injectable({
  providedIn: 'root',
})
export class CustomerCardService {
  constructor(
    private http: HttpClient,
    private customerServiceTicketsRepository: CustomerServiceTicketsRepository
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

  // Define API route
  apiFilterURL = `${this.customerServiceServerURL}/CustomerServiceTicket/Filter`;
  apiPutURL = `${this.customerServiceServerURL}/CustomerServiceTicket`;
  apiGetCategory = `${this.customerServiceServerURL}/Resource/Category`;
  apiGetBusiness = `${this.customerServiceServerURL}/Resource/LineOfBusiness`;
  apiGetRequireData = `${this.customerServiceServerURL}/Resource/RequiredData`;
  apiEmergencyTypeData = `${this.customerServiceServerURL}/Resource/Emergency/Types`;

  // HttpClient API post() method => Get customer service tickets
  getCutomerServiceTickets() {
       let paramObj: any = {
      "searchQuery": null,
      "assignedToId": null,
      "fromDateCreated": null,
      "toDateCreated": null,
      "fromDateModified": null,
      "toDateModified": null,
      "communicationChannelId": null
    };

    this.http
      .post<any>(this.apiFilterURL, paramObj, this.httpOptions)
      .subscribe((data) => {
        this.customerServiceTicketsRepository.updateTickets(data);
      });
  }

  // HttpClient API post() method => Filter customer service tickets
  filterCustomerServiceTickets(option: {}) {    
    this.http
      .post<PolicyCard>(this.apiFilterURL, option, this.httpOptions)
      .subscribe((data) => {   
        this.customerServiceTicketsRepository.updateTickets(data);
      });
  }

  // HttpClient API put() method => Put CustomerServiceTickets
  updateCustomServiceTickets(body: {}) {
    this.http
      .put<PolicyCard>(this.apiPutURL, body, this.httpOptions)
      .subscribe(console.log);
  }

  // HttpClient API get() method => get categories in CustomerServiceTicket
  getCategory() {
    return this.http
      .get<TicketCategory>(this.apiGetCategory, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => get businessed in CustomerServiceTicket
  getBusiness() {
    return this.http
      .get<TicketCategory>(this.apiGetBusiness, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => get products in CustomerServiceTicket
  getProduct(businessId: number) {
    const apiGetProducts = `${this.customerServiceServerURL}/Resource/Product/${businessId}`;
    return this.http
      .get<TicketCategory>(apiGetProducts, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => get required data in CustomerServiceTicket
  getRequiredData() {
    return this.http
      .get<TicketCategory>(this.apiGetRequireData, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => get emergencyTypes in CustomerServiceTicket
  getEmerencyTypeData() {
    return this.http
      .get<TicketCategory>(this.apiEmergencyTypeData, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => get emergencyInitiateItems in CustomerServiceTicket
  getEmergencyInitiateItems(TypeId: number) {
    const apiGetInitiates = `${this.customerServiceServerURL}/Resource/Emergency/InitiateItems/${TypeId}`;
    return this.http
      .get<TicketCategory>(apiGetInitiates, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
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
