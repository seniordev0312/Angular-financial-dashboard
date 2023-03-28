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

  customerServiceServerURL = `${environment.customerService}/api`;

  // Define API route
  apiFilterURL = `${this.customerServiceServerURL}/CustomerServiceTicket/Filter`;
  apiGetTicketData = `${this.customerServiceServerURL}/CustomerServiceTicket`;
  apiPutURL = `${this.customerServiceServerURL}/CustomerServiceTicket`;
  apiPutStatus = `${this.customerServiceServerURL}/CustomerServiceTicket/UpdateTicketStatus`;
  apiGetCategory = `${this.customerServiceServerURL}/Resource/Category`;
  apiGetBusiness = `${this.customerServiceServerURL}/Resource/LineOfBusiness`;
  apiGetRequireData = `${this.customerServiceServerURL}/Resource/RequiredData`;
  apiEmergencyTypeData = `${this.customerServiceServerURL}/Resource/Emergency/Types`;
  apiGetContactDetails = `${this.customerServiceServerURL}/Contact/contactDetailsByEin`;
  apiGetCommunicationChannel = `${this.customerServiceServerURL}/Resource/Reference/CommunicationChannel`;
  apiGetTicketStatus = `${this.customerServiceServerURL}/Resource/Reference/TicketStatus`;
  apiGetComplaintsCategories = `${this.customerServiceServerURL}/Resource/Reference/ComplaintCategory`;
  apiGetUserDetails = `${this.customerServiceServerURL}/User/UserDetails?SearchCriteria=`;

  // HttpClient API post() method => Get customer service tickets
  getCustomerServiceTickets() {
    let paramObj: any = {
      searchQuery: null,
      assignedToId: null,
      fromDateCreated: null,
      toDateCreated: null,
      fromDateModified: null,
      toDateModified: null,
      communicationChannelId: null,
      category: null,
    };

    this.http
      .post<any>(this.apiFilterURL, paramObj, this.httpOptions)
      .subscribe((data) => {
        this.customerServiceTicketsRepository.updateTickets(data);
      });
  }

  getTicketData(ticketId: number) {
    return this.http
      .get<any>(`${this.apiGetTicketData}/${ticketId}`, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
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

  // HttpClient API put() method => Update Customer Service Ticket Status
  updateCustomServiceTicket(body: {}) {
    this.http
      .put<PolicyCard>(this.apiPutStatus, body, this.httpOptions)
      .subscribe(console.log);
  }

  // HttpClient API put() method => Update Customer Service Ticket Details
  updateCustomServiceTicketDetails(ticketID: number, body: {}) {
    this.http
      .put<PolicyCard>(
        `${this.customerServiceServerURL}/CustomerServiceTicket/UpdateTicketDetails/${ticketID}`,
        body,
        this.httpOptions
      )
      .subscribe(console.log);
  }

  getUserDetails() {
    return this.http
      .get<any>(this.apiGetUserDetails, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getCustomerServiceTicketTypeApi() {
    return this.http
      .get<any>(this.apiGetCategory, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getCommunicationChannelApi() {
    return this.http
      .get<any>(this.apiGetCommunicationChannel, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getTicketStatusApi() {
    return this.http
      .get<any>(this.apiGetTicketStatus, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  
  getComplaintsCategoriesApi() {
    return this.http
      .get<any>(this.apiGetComplaintsCategories, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
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

  // HttpClient API get() method => get contact details based on EIN
  getContactDetails(ein: number) {
    const apiGetContactDets = `${this.apiGetContactDetails}/${ein}`;
    return this.http
      .get<TicketCategory>(apiGetContactDets, this.httpOptions)
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
