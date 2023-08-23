import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../customer/customer.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = "http://localhost:5148/api/Customer"; // Update the API URL according to the route in CustomerController.cs

  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/GetCustomers`);
  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/AddCustomer`, customer);
  }

  editCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/EditCustomer/${customer.customerId}`, customer);
  }

  deleteCustomer(customerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/DeleteCustomer/${customerId}`);
  }

  submitFormData(formData: any, headers: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submit`, formData);
  }
}
