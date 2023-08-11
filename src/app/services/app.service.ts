import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../customer/customer.component';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public apiUrl = "https://reqres.in/api/users";


  constructor(private http: HttpClient) { }

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}`);

  }

  addCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(`${this.apiUrl}/customers`, customer);
  }

  editCustomer(customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.apiUrl}/customers/${customer.customerId}`, customer);
  }

  deleteCustomer(customerId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/customers/${customerId}`);
  }


  submitFormData(formData: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/submit`, formData);
  }
}
