import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { User } from '../app/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  /**
   * The API URL
   * @type {string}
   * @private
   * @memberof UserService
   */
  private api: string = environment.api;

  constructor(private http: HttpClient) {}

  /**
   * Login
   * - This method sends a POST request to the API to log in a user.
   * - It takes an email and password as arguments.
   * - It returns an Observable of the response from the API.
   * @param {string} email
   * @param {string} password
   * @returns {Observable<{token : string}>}
   * @memberof UserService
   * @method login
   */ 
  login(email: string, password: string): Observable<{token : string}> {
    return this.http.post<{token : string}>(`${this.api}/users/login`, { email, password });
  }

  /**
   * Register
   * - This method sends a POST request to the API to register a new user.
   * - It takes a name, email, and password as arguments.
   * - It returns an Observable of the response from the API.
   * @param {string} name
   * @param {string} email
   * @param {string} password
   * @returns {Observable<any>}
   * @memberof UserService
   * @method register
   */
  register(name: string, email: string, password: string): Observable<any>{
    return this.http.post(`${this.api}/users/register`, { name, email, password });
  }

  /**
   * Logout
   * - This method removes the authentication token from local storage.
   * @memberof UserService
   * @method logout
   */
  logout(): void {
    localStorage.removeItem('authToken');
  }

  /**
   * Get User
   * - This method sends a GET request to the API to retrieve the user's profile information.
   * - It returns an Observable of the response from the API.
   * @returns {Observable<User>}
   * @memberof UserService
   * @method getUser
   */
  getUser(): Observable<User> {
    return this.http.get<User>(`${this.api}/users/profile`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  /**
   * Update User
   * - This method sends a PUT request to the API to update the user's profile information.
   * - It takes a user object as an argument.
   * - It returns an Observable of the response from the API.
   * @param {User} fields
   * @returns {Observable<User>}
   * @memberof UserService
   * @method updateUser
   */
  updateUser(fields: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.api}/users/profile`, fields, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }

  forgetPassword(email: string): Observable<any> {
    return this.http.post(`${this.api}/users/forget-password`, { email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    return this.http.post(`${this.api}/users/reset-password`, { token, password });
  }
  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.api}/users/change-password`, { oldPassword, newPassword }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
      }
    });
  }
}