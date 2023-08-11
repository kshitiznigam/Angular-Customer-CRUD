import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<any>('API_ENDPOINT/login', { username, password }).pipe(
      tap((response) => {
        if (response && response.access_token) {
          localStorage.setItem('access_token', response.access_token);
        }
      })
    );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }
}
